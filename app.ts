import "reflect-metadata";
import express, { Request, Response } from "express";
import "express-async-errors";
import useRoute from "./src/routes/usersRoute";
import "./src/database";
import errorMiddleware from "./src/middleware/middlewareError";
import routeTag from "./src/routes/tagsRoute";
import routeAuthenticationUser from "./src/routes/authenticationUser";
import routeCompliments from "./src/routes/compliments";
import routerComplimentsSend from "./src/routes/complimentsUserSend";
import routerComplimentsReceiver from "./src/routes/complimentsUserReceiver";

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
    this.app.use("/tags", routeTag);
    this.app.use("/login", routeAuthenticationUser);
    this.app.use("/compliments", routeCompliments);
    this.app.use("/compliments/send", routerComplimentsSend);
    this.app.use("/compliments/receiver", routerComplimentsReceiver);
    //middleware de erro vem depois das rotas
    //precisa da lib express-async-errors
    this.app.use(errorMiddleware.error);
  }
}

export default new App().app;
