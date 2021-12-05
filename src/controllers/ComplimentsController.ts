import { Request, Response } from "express";
import storeCompliments from "../services/StoreCompliments";

class ComplimentsController {
  async storeController(req: Request, res: Response) {
    const { user_sender, user_receiver, message, tag_id } = req.body;
    const { id } = await storeCompliments.storeCompliments({
      user_sender,
      user_receiver,
      message,
      tag_id,
    });
    return res
      .status(200)
      .json({ id, user_sender, user_receiver, message, tag_id });
  }
}

export default new ComplimentsController();
