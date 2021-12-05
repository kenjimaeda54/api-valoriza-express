import { Router } from "express";
import userController from "../controllers/UserController";

const useRoute = Router();

useRoute.post("/", userController.store);

export default useRoute;
