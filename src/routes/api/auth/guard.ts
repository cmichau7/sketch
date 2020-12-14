import { Request, Response } from "express";

export async function get(req: Request, res: Response): Promise<void> {
  if (!req.session?.user) {
    res.status(403).json({ ok: false, message: `Error. Unauthorized error.` });
    return;
  }

  if (req.session?.user) {
    const { user } = req.session;
    res.json({ ok: true, message: "success", data: user });
  }

  res.json({ ok: false, message: "Error. Unauthorized" });
}
