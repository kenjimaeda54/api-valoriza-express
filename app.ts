import express from "express";
import useRoute from "./src/routes/usersRoute";
import "./src/database";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", useRoute);

export default app;
