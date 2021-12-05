import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/Compliments";

class ComplimentsUserReceiver {
  async showComplimentsUserReceiver(userId: string) {
    const repository = getCustomRepository(ComplimentsRepositories);
    const complimentsUserReceiver = await repository.find({
      select: ["id", "user_receiver", "user_sender", "message"],
      where: {
        user_receiver: userId,
      },
      //preciso passar mesma nome de relacao que esta no join column
      relations: ["userSender", "tagId"],
    });
    return complimentsUserReceiver;
  }
}

export default new ComplimentsUserReceiver();
