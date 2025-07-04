import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authSupplier(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token_user;
  if (!token) res.status(401).json({ message: "Belum login sebagai supplier" });

  try {
    const payload = verifyToken(token);
    if (payload.role !== "supplier") {
      res.status(401).json({ message: "hanya supplier yang bisa uploads" });
    }
    (req as any).supplier = payload;
    next();
  } catch {
    res.status(401).json({ message: "Token tidak valid" });
    return;
  }
}
