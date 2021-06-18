import type { Request, Response } from "express";
import type { UserAccessModel } from "models/user-access";
import type { LoginInput, LoginResponse } from "typings/server";
// import { isDeepStrictEqual } from "util";
import api from "src/api";
import { User, UserModel } from "models/user";
import { Reader, ReaderModel } from "models/reader";
// import { CycleSubpool } from "models/cycle-subpool";
// import { ReaderType, ReaderTypeModel } from "models/reader-type";
// import { ReaderGroup } from "models/reader-group";
import { schema } from "routes/_signin";

export async function post(req: Request, res: Response): Promise<void> {
  const { username, password }: LoginInput = req.body;

  // TODO validate request body;
  if (!schema.isValid({ username, password })) {
    res
      .status(400)
      .json({ ok: false, message: `Sign in error. Validation failed.` });
    return;
  }

  try {
    const { status, message, id, ...rest } = await api.post<LoginResponse>(
      "auth/client",
      {
        username,
        password,
      }
    );

    // TODO Check request status put user data in current session
    if (status === "success") {
      console.log({ id, rest })
      const user = (await User.query()
        .alias("u")
        .findById(id)
        .select(
          "u.id",
          "u.username",
          "u.organisation_id",
          "u.firstname",
          "u.lastname",
          "u.email",
          "u.uuid",
          "a.account_active",
          "a.role",
          "a.group"
        )
        .joinRelated("access", { alias: "a" })) as UserModel & UserAccessModel;
        
      if (!user) {
        res
          .status(403)
          .json({ ok: false, message: `Signin Error. Unauhorized access.` });
        return;
      }

      if (!user.account_active) {
        res
          .status(401)
          .json({ ok: false, message: `Signin Error. Account not active.` });
        return;
      }

      // @ts-expect-error: Subpools not defined on session.
      const { subpools } = req ?.session;
      const readers = await Reader.query()
        .alias("r")
        .select(
          "r.reader_id",
          "r.group_id",
          "r.cycle_subpool_id",
          "r.email",
          "r.reader_type_id"
        )
        .whereIn("r.cycle_subpool_id", subpools)
        .where("r.proxy_id", user.id)
        .where("r.deleted_date", null)
        .withGraphFetched("[readerType]")
        .modifyGraph("readerType", (builder) =>
          builder.select("reader_type_id", "shortname")
        );

      // Convert multiple row into 1 reader with multiple relationship
      const reader = readers.reduce((obj, reader) => {
        if (reader.group_id && reader.readerType) {
          const id = reader.group_id;
          if (obj.groups && obj.groups[id]) {
            obj.groups[id] = [
              ...(obj.groups[id] as Record<string, unknown>[]),
              reader.readerType,
            ];
          } else {
            obj.groups = {
              ...obj.groups,
              [id]: [reader.readerType],
            };
          }
        }

        delete reader.group_id;
        delete reader.reader_type_id;
        delete reader.readerType;

        return { ...obj, ...reader } as ReaderModel;
      }, {} as ReaderModel);

      const data = { ...user, ...reader };

      // @ts-expect-error: User not defined on session.
      if (req.session) req.session.user = data;

      res.json({ ok: true, message, data });
      return;
    }

    res.status(401).json({ ok: false, message: `Signin Error. ${message}` });
  } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, message: `Request Error. ${err}` });
  }
}
