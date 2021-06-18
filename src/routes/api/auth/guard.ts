import type { Request, Response } from "express";

export async function get(req: Request, res: Response): Promise<void> {
  // @ts-expect-error: User not defined on session.
  if (req.session?.user) {
    // @ts-expect-error: User not defined on session.
    res.status(200).json({ ok: true, message: "success", data: req.session.user });
    return;
  }
  
  res.status(403).json({ ok: false, message: `Error. Unauthorized error.` });
}
