import { Request, Response } from "express";
import { transferPoints } from "../services/point";

export async function handleTransferPoints(req: Request, res: Response) {
  try {
    const { email, amount } = req.body;
    const sender = (req as any).user;

    const result = await transferPoints(sender.id, email, Number(amount));
    res.json({ message: "Transfer poin berhasil", ...result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
