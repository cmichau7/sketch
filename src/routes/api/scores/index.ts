import { ReaderGroup } from "models/reader-group";
import { ReaderType } from "models/reader-type";
import { Score } from "models/score";
import { isObject } from "utils/object";
import type { Request, Response } from "express";

export async function post(req: Request, res: Response): Promise<void> {
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

  // @ts-expect-error: User not defined on session.
  const { user } = req.session;
  const { applicant, scores } = req.body;

  try {
    let score: number;
    for (const [shortname, value] of Object.entries<
      string | Record<string, string>
    >(scores)) {
      if (isObject(value)) {
        score = Object.values(value).reduce(
          (sum, type, i) => sum + parseInt(type) * (i * 10 || 1),
          0
        );
      } else {
        score = parseInt(value);
      }

      const { rubric_id } = await ReaderType.relatedQuery("rubric")
        .for(
          ReaderGroup.relatedQuery("readerType")
            .alias("rt")
            .for(applicant.group_id)
            .where("rt.shortname", shortname)
        )
        .where("deleted_date", null)
        .first();

      await Score.query()
        .patch({
          deleted_date: new Date().getTime(),
        })
        .where("applicant_id", applicant.applicant_id)
        .where("reader_id", user.reader_id)
        .where("proxy_id", user.id)
        .where("rubric_id", rubric_id);

      await Score.query().insert({
        applicant_id: applicant.applicant_id,
        reader_id: user.reader_id,
        proxy_id: user.id,
        rubric_id,
        score,
      });
    }

    res.json({ ok: true, message: "Success", data: scores });
  } catch (err) {
    console.error(err);
    res.json({ ok: false, message: `Error ${err}` });
  }
}

// TODO insert score
// const rubric = await Rubric.query()
//   .alias("r")
//   .select(
//     "r.rubric_id",
//     "r.title",
//     "a.value",
//     "rt.reader_type_id",
//     "rt.shortname"
//   )
//   .where("a.deleted_date", null)
//   .where("a.text", "")
//   .joinRelated("answer", { alias: "a" })
//   .joinRelated("readerType", { alias: "rt" });

// console.log({ rubric, score });

// score;
// await Applicant.query()
//   .alias("a")
//   .select("a.applicant_id", "a.reference_number", "rg.group_id")
//   .where("reference_number", applicant.reference_number)
//   .joinRelated("readerGroup", { alias: "rg" })
//   .withGraphFetched("[scores, flags, notes]");

// // TODO format score into 1 digit
// const score = applicants.map()
