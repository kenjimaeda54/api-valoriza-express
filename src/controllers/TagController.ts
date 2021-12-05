import { Request, Response } from "express";
import serviceStore from "../services/StoreTags";
import serviceShow from "../services/ShowTags";

class TagController {
  async storage(req: Request, res: Response) {
    const { name } = req.body;
    const tag = await serviceStore.store(name);
    return res.status(200).json(tag);
  }

  async show(req: Request, res: Response) {
    const tags = await serviceShow.show();
    return res.status(200).json(tags);
  }
}

export default new TagController();
