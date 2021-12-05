import { Request, Response, NextFunction } from "express";

export default function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.user_id);
  return next();
}
