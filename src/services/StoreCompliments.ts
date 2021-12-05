import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/Compliments";
import { UserRepositores } from "../repositories/UserRepositores";

interface ICompliments {
  user_sender: string;
  user_receiver: string;
  message: string;
  tag_id: string;
}

class StoreComplimentsService {
  async storeCompliments({
    user_sender,
    user_receiver,
    message,
    tag_id,
  }: ICompliments) {
    const repositoryCompliments = getCustomRepository(ComplimentsRepositories);
    const repositoryUser = getCustomRepository(UserRepositores);

    if (user_sender === user_receiver) {
      throw new Error("You can't send a compliment to yourself");
    }
    const user = await repositoryUser.findOne({ id: user_receiver });
    if (!user) {
      throw new Error("User don't exists");
    }

    const userCreated = repositoryCompliments.create({
      user_sender,
      user_receiver,
      message,
      tag_id,
    });
    await repositoryCompliments.save(userCreated);
    return userCreated;
  }
}

export default new StoreComplimentsService();
