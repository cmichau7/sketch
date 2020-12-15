import type { Request, Response } from "express";

export async function get(req: Request, res: Response): Promise<void> {
  // @ts-expect-error: User not defined on session.
  if (!req.session?.user) {
    res.status(403).json({ ok: false, message: `Error. Unauthorized error.` });
    return;
  }

  // @ts-expect-error: User not defined on session.
  if (req.session?.user) {
    // @ts-expect-error: User not defined on session.
    res.json({ ok: true, message: "success", data: req.session.user });
  }

  res.json({ ok: false, message: "Error. Unauthorized" });
}
