import { prisma } from "../connection/client";

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
}) {
  return await prisma.product.create({ data });
}

export async function getAllProducts({
  search,
  sort,
  page = 1,
  limit = 10,
}: {
  search?: string;
  sort?: "asc" | "desc";
  page?: number;
  limit?: number;
}) {
  const where = search
    ? {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};
  const orderBy =
    sort === "asc" || sort === "desc" ? { price: sort } : { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where: {
      ...where,
      deletedAt: null,
    },
    orderBy,
    skip: (page - 1) * limit,
    take: limit,
  });
  const total = await prisma.product.count({
    where: {
      ...where,
      deletedAt: null,
    },
  });
  return { products, total };
}

export async function updateProduct(
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    image?: string;
  }
) {
  return await prisma.product.update({
    where: { id },
    data,
  });
}

export async function softDeleteProduct(id: number) {
  await prisma.product.update({
    where: { id },
    data: {
      deletedAt: new Date(),
    },
  });
}

export async function restoreProduct(id: number) {
  await prisma.product.update({
    where: { id },
    data: {
      deletedAt: null,
    },
  });
}
