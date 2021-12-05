import { Router } from "express";
import complimentsController from "../controllers/ComplimentsController";

const router = Router();

router.post("/", complimentsController.storeController);

export default router;
