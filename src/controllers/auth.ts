import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../connection/client"; // pastikan prisma jalan

export const register = async (req: Request, res: Response) => {
  try {
    console.log("📦 DEBUG BODY:", req.body); // Tambah ini!

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Semua field harus diisi" });
      return;
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      res.status(400).json({ message: "Email sudah terdaftar" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashed,
        role: role || "user",
      },
    });

    res.status(201).json({
      message: "Berhasil register",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error("[REGISTER ERROR]", err);
    res.status(500).json({ message: "Gagal register", error: err.message });
  }
};
