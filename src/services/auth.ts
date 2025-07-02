import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "../prisma/client";
import { signIn } from "../utils/jwt";

export async function registerUser(
  email: string,
  password: string,
  role: string
) {
  if (!email.match(/@/) || password.length < 6)
    throw new Error("email atau password tidak valid");

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashed, role },
  });
  return { id: user.id, email: user.email, role: user.role };
}
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("user tidak ada");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("password salah");

  const token = signIn({ id: user.id, role: user.role });
  return { token };
}

export async function resetToken(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("user tidak ditemukan");

  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashed = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expires = new Date(Date.now() + 15 * 60 * 1000);
  await prisma.user.update({
    where: { email },
    data: {
      resetToken: hashed,
      resetTokenExpires: expires,
    },
  });
  return rawToken;
}
export async function resetPassword(
  email: string,
  token: string,
  newPassword: string
) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await prisma.user.findFirst({
    where: {
      email,
      resetToken: hashedToken,
      resetTokenExpires: {
        gt: new Date(),
      },
    },
  });

  if (!user) throw new Error("token tidak valid atau kadaluarsa");
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });
}
