import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();

  await prisma.user.createMany({
    data: [
      { name: "Mizyal", email: "mizyal@example.com", points: 100 },
      { name: "Aulia", email: "aulia@example.com", points: 80 },
      { name: "Rafi", email: "rafi@example.com", points: 150 },
      { name: "Nabila", email: "nabila@example.com", points: 200 },
      { name: "Dewi", email: "dewi@example.com", points: 50 },
      { name: "Yusuf", email: "yusuf@example.com", points: 70 },
      { name: "Siti", email: "siti@example.com", points: 90 },
      { name: "Fikri", email: "fikri@example.com", points: 60 },
      { name: "Amira", email: "amira@example.com", points: 110 },
      { name: "Budi", email: "budi@example.com", points: 95 },
    ],
  });
}
main()
  .then(() => {
    console.log("data berhasil di kirim");
  })
  .catch((error) => {
    console.log("data gagal dikirim");
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
