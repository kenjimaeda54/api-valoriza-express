import { getCustomRepository } from "typeorm";
require("dotenv").config();
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { UserRepositores } from "../repositories/UserRepositores";

interface IAuthenticationUser {
  email: string;
  password: string;
}

class AuthenticationUser {
  async storeAuthUser({ email, password }: IAuthenticationUser) {
    const userRepository = getCustomRepository(UserRepositores);
    const user = await userRepository.findOne({ email });
    if (!user) {
      throw new Error("Email/password incorrect");
    }
    const passwordCorrect = await compare(password, user.password);
    if (!passwordCorrect) {
      throw new Error("Email/password incorrect");
    }
    //ele espera um objeto no primeiro parametro nao aceita
    //string
    const token = sign({ email }, process.env.TOKEN_SECRET, {
      //qual informacoes quero passar para subject,no cao o id do usuario
      subject: user.id,
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return token;
  }
}

export default new AuthenticationUser();
