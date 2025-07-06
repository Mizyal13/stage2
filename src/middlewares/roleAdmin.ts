import { Request, Response, NextFunction } from "express";

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const user = (req as any).user;
  if (user?.role !== "admin") {
    res.status(403).json({ message: "hanya admin yang bolehh" });
    return;
  }
  next();
}
