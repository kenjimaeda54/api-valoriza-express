import { TagRepository } from "../repositories/TagRepositores";

class StoreTags {
  async store(name: string) {
    const tagsRepository = new TagRepository();
    if (!name) {
      throw new Error("Name is required or invalid");
    }
    //se houve mais dois parametros para procurar precisaria do where
    //SELECT * FROM tags WHERE name = 'name'
    const tag = await tagsRepository.findOne({
      name,
    });
    if (tag) {
      throw new Error("Tag already exists");
    }
    const newTag = tagsRepository.create({ name });
    await tagsRepository.save(newTag);
    return newTag;
  }
}

export default new StoreTags();
