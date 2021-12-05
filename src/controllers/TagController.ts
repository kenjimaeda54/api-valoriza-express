import { Request, Response } from "express";
import service from "../services/StoreTags";

class TagController {
  async storage(req: Request, res: Response) {
    const { name } = req.body;
    const tag = await service.store(name);
    return res.status(200).json(tag);
  }
}

export default new TagController();
