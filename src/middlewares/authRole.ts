import { Request, Response, NextFunction } from "express";

export function authorizeRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: "akses di tolak" });
      return;
    }
    next();
  };
}
