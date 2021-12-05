import { Router } from "express";
import controllerComplimentsUserReceiver from "../controllers/ComplimentsUserReceiverController";
import ensureToken from "../middleware/ensureToken";

const router = Router();

router.get(
  "/",
  ensureToken,
  controllerComplimentsUserReceiver.showComplimentsReceiverController
);

export default router;
