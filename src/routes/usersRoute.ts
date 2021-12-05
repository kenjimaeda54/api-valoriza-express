import { Router } from "express";
import userController from "../controllers/UserController";
import ensureToken from "../middleware/ensureToken";

const useRoute = Router();

useRoute.post("/", userController.store);
useRoute.get("/", ensureToken, userController.show);

export default useRoute;
