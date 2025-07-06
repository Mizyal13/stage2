import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token_user;
  if (!token) {
    res.status(401).json({ message: "Tidak ada token" });
    return;
  }

  try {
    const user = verifyToken(token);
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token tidak valid" });
    return;
  }
}
