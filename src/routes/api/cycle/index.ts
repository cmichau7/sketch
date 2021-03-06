import { Setting } from "models/setting";
import { Cycle } from "models/cycle";
import type { Request, Response } from "express";

export async function get(req: Request, res: Response): Promise<void> {
  try {
    const cycle = await Cycle.query()
      .select("cycle_id", "year")
      .withGraphFetched("[cycleSubpool]")
      .modifyGraph("cycleSubpool", (builder) =>
        builder.select("cycle_subpool_id")
      )
      .where(
        "cycle_id",
        Setting.query()
          .select("value")
          .where("shortname", "admissions_cycle")
          .first()
      )
      .first();

    const subpools = cycle.cycleSubpool.map(
      (subpool) => subpool.cycle_subpool_id
    );

    if (req.session) {
      // @ts-expect-error: User not defined on session.
      req.session.cycle = cycle;
      // @ts-expect-error: User not defined on session.
      req.session.subpools = subpools;
    }

    res.json({
      ok: true,
      message: "success",
      data: { cycle, subpools },
    });
  } catch (err) {
    console.error(err);
    res.json({ ok: false, message: `Error ${err}` });
  }
}
