import type { Request, Response } from "express";

export async function post(req: Request, res: Response): Promise<void> {
  // @ts-expect-error: User not defined on session.
  delete req?.session?.user;

  res.json({ ok: true, message: "Logged out succesfully." });
}
