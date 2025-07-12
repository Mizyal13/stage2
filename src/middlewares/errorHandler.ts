import { NextFunction, Request, Response } from "express";

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("❌ ERROR:", err);

  if (err.type === "STOCK_NEGATIVE") {
    return res.status(400).json({ error: "Stok tidak boleh negatif!" });
  }

  if (err.type === "SUPPLIER_NOT_FOUND") {
    return res.status(404).json({ error: "Supplier tidak ditemukan!" });
  }

  return res.status(500).json({ error: "Terjadi kesalahan server." });
}
