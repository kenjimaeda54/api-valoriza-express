import { Repository } from "typeorm";
import { Tags } from "../entities/Tag";

class TagRepository extends Repository<Tags> {}

export { TagRepository };
