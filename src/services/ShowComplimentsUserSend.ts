import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/Compliments";

class ComplimentsUserSend {
  async showComplimentsUserSend(userId: string) {
    const repository = getCustomRepository(ComplimentsRepositories);
    return await repository.find({
      select: ["id", "user_receiver", "user_sender", "message"],
      where: {
        user_sender: userId,
      },
    });
  }
}

export default new ComplimentsUserSend();
