import { Request, Response } from "express";
import serviceUser from "../services/StoreUsers";
import { hash } from "bcryptjs";

class UserController {
  async store(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;
    const passwordHash = await hash(password, 8);
    const user = await serviceUser.storeUser({
      name,
      email,
      admin,
      password: passwordHash,
    });
    return response.json(user);
  }
}

export default new UserController();
