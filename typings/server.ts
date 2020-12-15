import type { Request, Response, NextFunction } from "express";

// Server Handler
export interface Context {
  req: Request;
  res: Response;
}

type Status = number;
type JsonData = unknown;
export type Handler = (
  ctx: Context,
  next: NextFunction
) => Promise<[Status, JsonData]>;

// Login
export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: number | string;
  message: string;
  id: string;
  [key: string]: unknown;
}
