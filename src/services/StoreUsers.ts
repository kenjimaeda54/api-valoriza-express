import { UserRepositores } from "../repositories/UserRepositores";
import { getCustomRepository } from "typeorm";

export interface IStoreUsers {
  name: string;
  email: string;
  admin: boolean;
}

class StoreUserService {
  async storeUser({ name, email, admin }: IStoreUsers) {
    const userRepository = getCustomRepository(UserRepositores);
    if (!email) {
      throw new Error("Email is required");
    }
    const user = await userRepository.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
    const userStore = userRepository.create({ name, email, admin });
    await userRepository.save(userStore);
    return userStore;
  }
}

export default new StoreUserService();
