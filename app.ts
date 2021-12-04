import "reflect-metadata";
import express, { Request, Response } from "express";
import "express-async-errors";
import useRoute from "./src/routes/usersRoute";
import "./src/database";
import errorMiddleware from "./src/middleware/middlewareError";

class App {
  app: any;
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {}

  routes() {
    //json precisa vim acima das rotas,dentro da classe routes nao no construtor
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use("/users", useRoute);
    //middleware de erro vem depois das rotas
    //precisa da lib express-async-errors
    this.app.use(errorMiddleware.error);
  }
}

export default new App().app;
