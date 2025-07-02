import { Request, Response } from "express";
import { registerS, loginS } from "../validation/auth";
import {
  registerUser,
  loginUser,
  resetToken,
  resetPassword,
} from "../services/auth";

export async function handleRegist(req: Request, res: Response) {
  try {
    const { error } = registerS.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password, role } = req.body;
    const user = await registerUser(email, password, role);
    res.status(201).json({ message: "berhasil register" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { error } = loginS.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const { email, password } = req.body;

    const result = await loginUser(email, password);
    res.json({ message: "login success", ...result });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export async function handleAllUsers(req: Request, res: Response) {
  const user = (req as any).user;
  console.log("role yang login", user.role);
}

export async function resetRequest(req: Request, res: Response) {
  const { email } = req.body;
  const token = await resetToken(email);
  res.json({ message: "token reset dikirim", token });
  console.log(token);
}
export async function resetPassword2(req: Request, res: Response) {
  const { email, token, newPassword } = req.body;
  await resetPassword(email, token, newPassword);
  res.json({ message: "password berhasil di reset" });
  console.log(resetPassword);
}
