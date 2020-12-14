import { Applicant, ApplicantModel } from "models/applicant";
import { ReaderGroup, ReaderGroupModel } from "models/reader-group";
import { ReaderTypeModel } from "models/reader-type";
import { RubricModel } from "models/rubric";
import { formatConstraints, formatScores } from "utils/scores";
import { Request, Response } from "express";

export async function get(req: Request, res: Response): Promise<void> {
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
  const { user } = req.session;

  try {
    const applicant = (await Applicant.query()
      .alias("a")
      .select("a.applicant_id", "a.reference_number", "rg.group_id")
      .where("a.reference_number", id)
      .joinRelated("readerGroup", { alias: "rg" })
      .withGraphJoined("[scores, flags, notes, files]")
      .modifyGraph("scores", (builder) =>
        builder
          .select(
            "score_id",
            "applicant_id",
            "rubric_id",
            "reader_id",
            "proxy_id",
            "score"
          )
          .where("deleted_date", null)
      )
      .modifyGraph("flags", (builder) => builder.where("deleted_date", null))
      .modifyGraph("notes", (builder) => builder.where("deleted_date", null))
      .modifyGraph("files", (builder) =>
        builder.where("subtype", "detailsketch-topchoices")
      )
      .first()) as ApplicantModel & ReaderGroupModel;

    if (applicant.scores) {
      const types = (await ReaderGroup.relatedQuery("readerType")
        .for(applicant.group_id)
        .alias("rt")
        .select("rt.shortname")
        .withGraphFetched("[rubric.answer]")
        .modifyGraph("rubric", (builder) =>
          builder.select("rubric_id").where("deleted_date", null)
        )
        .modifyGraph("rubric.answer", (builder) =>
          builder.select("text", "value").where("deleted_date", null)
        )) as ReaderTypeModel[];

      applicant.scores = formatScores(applicant.scores, types);
    }

    res.json({ ok: true, message: "Success", data: applicant });
  } catch (err) {
    console.error(err);
    res.json({ ok: false, message: `Error ${err}` });
  }
}
