import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token_user; // ambil token dari cookie

  if (!token) {
    res.status(401).json({ message: "Tidak ada token" });
    return;
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // simpan hasil decode ke req.user

    console.log("✅ AUTHENTICATED USER:", decoded); // <--- Tambahkan ini untuk cek usernya
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
  }
}
