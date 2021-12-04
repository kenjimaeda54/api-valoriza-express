import { Request, Response } from "express";
import serviceUser from "../services/StoreUsers";

class UserController {
  async store(request: Request, response: Response) {
    const { name, email, admin } = request.body;
    const user = await serviceUser.storeUser({ name, email, admin });
    return response.json(user);
  }
}

export default new UserController();
