import { Request, Response } from "express";
import { hash } from "bcryptjs";
import serviceUser from "../services/StoreUsers";
import showUsers from "../services/ShowUsers";

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
  async show(request: Request, res: Response) {
    const users = await showUsers.showUsers();
    return res.status(200).json(users);
  }
}

export default new UserController();
