import { Request, Response } from "express";

export async function post(req: Request, res: Response): Promise<void> {
  delete req?.session?.user;

  res.json({ ok: true, message: "Logged out succesfully." });
}
