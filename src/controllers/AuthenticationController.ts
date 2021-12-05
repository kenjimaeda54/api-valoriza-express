import { Request, Response } from "express";
import serviceAuthentication from "../services/AuthenticationUser";

class AuthenticationUserController {
  async storeAuthenticationUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await serviceAuthentication.storeAuthUser({
      email,
      password,
    });
    return res.status(200).json(token);
  }
}

export default new AuthenticationUserController();
