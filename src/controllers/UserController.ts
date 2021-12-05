import { Request, Response } from "express";
import serviceUser from "../services/StoreUsers";
import { hash } from "bcryptjs";

class UserController {
  async store(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;
    const passwordHash = await hash(password, 8);
    const {
      email: emailUser,
      admin: adminUser,
      password: passwordUser,
      id,
    } = await serviceUser.storeUser({
      name,
      email,
      admin,
      password: passwordHash,
    });
    return response.json({ id, emailUser, adminUser, passwordUser });
  }
}

export default new UserController();
