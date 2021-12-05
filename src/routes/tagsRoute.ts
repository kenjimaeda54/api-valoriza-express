import { Router } from "express";
import tagController from "../controllers/TagController";

const router = Router();

router.post("/", tagController.storage);

export default router;
