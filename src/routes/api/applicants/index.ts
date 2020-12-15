import type { Request, Response } from "express";
import { Applicant } from "models/applicant";
// import { Setting } from "models/setting";
import { ReaderGroup } from "src/models/reader-group";

export async function get(req: Request, res: Response): Promise<void> {
  // @ts-expect-error: User not defined on session.
  if (!req.session?.user) {
    res.status(403);
    res.json({
      ok: false,
      message:
        "Unauthorized access. You must be signed in to access this path.",
    });
    return;
  }

  // @ts-expect-error: User & Cycle not defined on session.
  const { cycle, user } = req.session;

  try {
    //  Fetch all groups of current cycle if admin otherwise only assigned groups for the reader.
    const groups =
      user.role !== "admin"
        ? Object.keys(user.groups)
        : (
            await ReaderGroup.query()
              .select("group_id")
              .withGraphJoined("[cycle]")
              .modifyGraph("cycle", (builder) =>
                builder.where("cycle_id", cycle)
              )
          ).map(({ group_id }) => group_id);

    // Fetch all applicants of current user
    // @ts-expect-error: Subpools not defined on session.
    const { subpools } = req?.session;
    const applicants = await Applicant.query()
      .alias("a")
      .select("a.applicant_id", "a.reference_number", "rg.group_id")
      .whereIn("a.cycle_subpool_id", subpools)
      .orderBy("a.reference_number")
      .joinRelated("readerGroup", { alias: "rg" })
      .whereIn("rg.group_id", groups)
      .withGraphJoined("[scores, flags, notes]")
      .modifyGraph("scores", (builder) => builder.where("deleted_date", null))
      .modifyGraph("flags", (builder) => builder.where("deleted_date", null))
      .modifyGraph("notes", (builder) => builder.where("deleted_date", null));

    res.json({
      ok: true,
      message: "successfully fetched applicants.",
      data: applicants,
    });
  } catch (err) {
    console.error(err);
    res.json({ ok: false, message: `Error ${err}` });
  }
}
