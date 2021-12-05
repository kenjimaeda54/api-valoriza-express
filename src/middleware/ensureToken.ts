import { Request, Response, NextFunction } from "express";
require("dotenv").config();
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

//middleware no minimo 3 parametros
//de preferencia por funcao quando a classe nao possui metodos
//se nao vai precisar de parametros no constructor
export default function MiddlewareEnsureLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).send({
      message: "No token provided",
    });
  }
  const [, token] = auth.split(" ");

  //verifica se o token esta correto
  //try e catch e para garantir possiveis erros
  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayload;
    //pegando o id
    //e setando n request
    req.user_id = sub;
    return next();
  } catch (err) {
    return res.status(401).send({
      message: "Invalid token or token expired",
    });
  }
}
