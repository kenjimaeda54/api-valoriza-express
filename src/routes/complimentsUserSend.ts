import { Router } from "express";
import controllerComplimentsUserSend from "../controllers/ComplimentsUserSendController";
import ensureToken from "../middleware/ensureToken";

const router = Router();

router.get(
  "/",
  ensureToken,
  controllerComplimentsUserSend.showComplimentsSendController
);

export default router;
