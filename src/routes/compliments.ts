import { Router } from "express";
import complimentsController from "../controllers/ComplimentsController";
import ensureToken from "../middleware/ensureToken";

const router = Router();

router.post("/", ensureToken, complimentsController.storeController);

export default router;
