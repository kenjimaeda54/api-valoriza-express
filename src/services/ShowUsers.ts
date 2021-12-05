import { getCustomRepository } from "typeorm";
import { UserRepositores } from "../repositories/UserRepositores";

class SHowUser {
  async showUsers() {
    const repository = getCustomRepository(UserRepositores);
    const users = await repository.find({
      select: ["id", "name", "email", "admin"],
    });
    return users;
  }
}
export default new SHowUser();
