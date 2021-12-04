import { Repository, EntityRepository } from "typeorm";
import { Tags } from "../entities/Tag";

@EntityRepository(Tags)
class TagRepository extends Repository<Tags> {}

export { TagRepository };
