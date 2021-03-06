import type { ReaderTypeModel } from "models/reader-type";
import { ReaderGroup } from "models/reader-group";
import { formatConstraints } from "utils/scores";
import type { Request, Response } from "express";

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

  const { id } = req.params;
  try {
    const types = (await ReaderGroup.relatedQuery("readerType")
      .for(id)
      .alias("rt")
      .select("rt.name", "rt.shortname")
      .withGraphFetched("[rubric.answer]")
      .modifyGraph("rubric", (builder) =>
        builder.select("rubric_id").where("deleted_date", null)
      )
      .modifyGraph("rubric.answer", (builder) =>
        builder.select("text", "value").where("deleted_date", null)
      )
      .orderBy("rt.name")) as ReaderTypeModel[];

    const scores = formatConstraints(types);

    res.json({ ok: true, message: "Success", data: scores });
  } catch (err) {
    console.error(err);
    res.json({ ok: false, message: `Error ${err}` });
  }
}
