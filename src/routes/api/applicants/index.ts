import { Applicant } from "models/applicant";
// import { Setting } from "models/setting";
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

  // const { flagged } = req.query;
  const { user } = req.session;

  try {
    // TOOD fetch only user assigned applicants or only flagged if user admin.
    // Fetch all applicants of current user
    const applicants = await Applicant.query()
      .alias("a")
      .select("a.applicant_id", "a.reference_number", "rg.group_id")
      .whereIn("a.cycle_subpool_id", req?.session?.subpools)
      .orderBy("a.reference_number")
      .joinRelated("readerGroup", { alias: "rg" })
      .whereIn("rg.group_id", Object.keys(user.groups))
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
