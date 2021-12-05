import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepositores";
import { instanceToPlain } from "class-transformer";

class ShowTags {
  async show() {
    const repository = getCustomRepository(TagRepository);
    const tags = await repository.find({ select: ["id", "name"] });
    return instanceToPlain(tags);
  }
}

export default new ShowTags();
