import { UserRepositores } from "../repositories/UserRepositores";
import { getCustomRepository } from "typeorm";

export interface IStoreUsers {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}

class StoreUserService {
  //para determinar valor default de um parametro e so colocar
  //igual
  async storeUser({ name, email, admin = false, password }: IStoreUsers) {
    const userRepository = getCustomRepository(UserRepositores);
    if (!email) {
      throw new Error("Email is required");
    }
    const user = await userRepository.findOne({ email });
    if (user) {
      throw new Error("Email already exists");
    }
    const userStore = userRepository.create({ name, email, admin, password });
    await userRepository.save(userStore);
    return userStore;
  }
}

export default new StoreUserService();
