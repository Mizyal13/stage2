import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;

export interface userLoad {
  id: number;
  role: string;
}

export function signIn(payload: userLoad) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as userLoad;
}

export function createResetToken(email: string) {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "15m" });
}
export function verifyResetToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { email: string };
}
