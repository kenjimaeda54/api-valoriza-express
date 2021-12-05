import { Router } from "express";
import authenticationController from "../controllers/AuthenticationController";

const router = Router();

router.post("/", authenticationController.storeAuthenticationUser);

export default router;
