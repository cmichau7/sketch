// import { Flag } from "models/flag";
import { Applicant } from "models/applicant";
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
  const { applicant, reason } = req.body;

  // TODO validate req.body

  try {
    const flag = await Applicant.relatedQuery("applicantFile")
      .for(applicant.applicant_id)
      .insertGraph(
        [
          {
            filename: "",
            file_num: 0,
            path: "",
            flag: [
              {
                reason,
                proxy_id: user.id,
              },
            ],
          },
        ],
        { allowRefs: true }
      );

    res.json({ ok: true, message: "success", data: flag });
  } catch (err) {
    console.error(err);
    res.json({ ok: false, message: `Error ${err}` });
  }
}
