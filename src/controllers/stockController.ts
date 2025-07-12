import { Request, Response, NextFunction } from "express";
import { prisma } from "../connections/client";

export async function updateSupplierStocks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { stocks } = req.body;

  try {
    await prisma.$transaction(async (tx) => {
      for (const { productId, supplierId, quantityChange } of stocks) {
        const existing = await tx.stock.findFirst({
          where: { productId, supplierId },
        });

        if (!existing) {
          throw { type: "SUPPLIER_NOT_FOUND" };
        }

        const newQuantity = existing.quantity + quantityChange;

        if (newQuantity < 0) {
          throw { type: "STOCK_NEGATIVE" };
        }

        await tx.stock.update({
          where: { id: existing.id },
          data: { quantity: newQuantity },
        });
      }
    });

    res.status(200).json({ message: "Stok berhasil diperbarui." });
  } catch (err) {
    next(err);
  }
}
