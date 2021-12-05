import { Request, Response } from "express";
import complimentsServiceReceiver from "../services/ShowComplimentsUserReceiver";

class ComplimentsUserReceiverController {
  async showComplimentsReceiverController(req: Request, res: Response) {
    const { user_id } = req;
    const complimentsUserReceiver =
      await complimentsServiceReceiver.showComplimentsUserReceiver(user_id);
    return res.status(200).json(complimentsUserReceiver);
  }
}

export default new ComplimentsUserReceiverController();
