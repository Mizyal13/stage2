import { Router } from "express";
import {
  handleRegist,
  handleLogin,
  resetTokenRequest,
  handleResetPassword,
} from "../controllers/auth";
import { upload } from "../utils/multer";
import { authenticate } from "../middlewares/authenticate";
authenticate;

const router = Router();

router.get("/me", authenticate, (req, res) => {
  res.json({ user: (req as any).user });
});

router.post("/register", upload.single("profile"), handleRegist);
router.post("/login", handleLogin);
router.post("/reset-token", resetTokenRequest);
router.post("/reset-password", handleResetPassword);

export default router;
