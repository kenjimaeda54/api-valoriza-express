import { Router } from "express";
import tagController from "../controllers/TagController";
import ensureToken from "../middleware/ensureToken";
import ensureAdmin from "../middleware/ensureAdmin";

const router = Router();

router.post("/", ensureToken, ensureAdmin, tagController.storage);
router.get("/", ensureToken, tagController.show);

export default router;
