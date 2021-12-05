import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepositores } from "../repositories/UserRepositores";

export default async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const repository = getCustomRepository(UserRepositores);
  const id = req.user_id;
  const { admin } = await repository.findOne({ id });
  console.log(admin);
  if (admin) {
    return next();
  }
  return res.status(401).json({
    message: "Only admins can access this route",
  });
}
