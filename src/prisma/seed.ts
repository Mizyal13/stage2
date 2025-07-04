import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: "Beras Premium 5kg", price: 85000, supplierId: 1 },
      { name: "Minyak Goreng 2L", price: 32000, supplierId: 2 },
      { name: "Sabun Cuci Piring", price: 15000, supplierId: 1 },
      { name: "Gula Pasir 1kg", price: 13500, supplierId: 3 },
      { name: "Kopi Bubuk 250g", price: 22000, supplierId: 2 },
    ],
  });
}
