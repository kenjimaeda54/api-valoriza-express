import { Router } from "express";
import tagController from "../controllers/tagController";

const router = Router();

router.post("/", tagController.storage);

export default router;
