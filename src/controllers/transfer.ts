import { prisma } from "../prisma/client";
import { Request, Response } from "express";

export const transferPoint = async (req: Request, res: Response, next: any) => {
  const { amount, sendedId, receiverId } = req.body;

  try {
    if (amount <= 0) {
      throw { status: 400, message: "jumlah point harus lebih dari 0" };
    }
    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: sendedId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);
    if (!sender) throw { status: 404, message: "pengirim tidak ditemukan" };
    if (!receiver) throw { status: 404, message: "penerima tidak ditemukan" };
    if (sender.points < amount)
      throw { status: 400, message: "point tidak mencukupi" };

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: sendedId },
        data: { points: { decrement: amount } },
      });
      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });
    });
  } catch (error) {
    next(error);
  }
};

export const userPoint = async (req: Request, res: Response, next: any) => {
  try {
    const userId = Number(req.params.id);
    const userPoint = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        points: true,
      },
    });
    res.status(200).json({ message: "data ditemukan", data: userPoint });
  } catch (error) {
    next(error);
  }
};
