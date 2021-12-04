import { Router } from "express";
import userController from "../controllers/userController";

const useRoute = Router();

useRoute.post("/", userController.store);

export default useRoute;
