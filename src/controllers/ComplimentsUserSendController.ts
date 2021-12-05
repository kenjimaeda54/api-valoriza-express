import { Request, Response } from "express";
import showComplimentsUserSend from "../services/ShowComplimentsUserSend";

class ComplimentsUserSendController {
  async showComplimentsSendController(req: Request, res: Response) {
    const { user_id } = req;
    const complimentsUserReceiver =
      await showComplimentsUserSend.showComplimentsUserSend(user_id);
    return res.status(200).json(complimentsUserReceiver);
  }
}

export default new ComplimentsUserSendController();
