import { Request, Response } from "express";
import { prisma } from "../prisma/client";
import { productS } from "../validation/product";

export async function addProduct(req: Request, res: Response) {
  const { error } = productS.validate(req.body);
  if (error) res.status(400).json({ message: error.message });

  const { name, price } = req.body;
  const user = (req as any).user;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      supplierId: user.id,
    },
  });

  res.status(201).json({ message: "produk ditambahkan", product });
}

export async function getMyProducts(req: Request, res: Response) {
  const user = (req as any).user;

  const products = await prisma.product.findMany({
    where: { supplierId: user.id },
  });

  res.json({ products });
}

export async function updateProduct(req: Request, res: Response) {
  const id = +req.params.id;
  const { name, price } = req.body;
  const user = (req as any).user;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.supplierId !== user.id)
    res.status(403).json({ message: "akses ditolak" });

  const updated = await prisma.product.update({
    where: { id },
    data: { name, price },
  });

  res.json({ message: "produk diperbarui", product: updated });
}

export async function deleteProduct(req: Request, res: Response) {
  const id = +req.params.id;
  const user = (req as any).user;

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.supplierId !== user.id)
    res.status(403).json({ message: "akses ditolak" });

  await prisma.product.delete({ where: { id } });
  res.json({ message: "produk dihapus" });
}

export const uploadProductImage = async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ message: "gambar tidak ada bro" });
    return;
  }
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ message: "upload berhasil", imageUrl });
};
