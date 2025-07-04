import express from "express";
import {
  handleRegist,
  handleLogin,
  handleAllUsers,
  resetRequest,
  resetPassword2,
} from "../controllers/auth";
import { authenticate } from "../middlewares/auth";
import { authorizeRole } from "../middlewares/authRole";
import { upload } from "../utils/multer";
import limiter from "../middlewares/rate-limiter";

const router = express.Router();

router.post("/register", upload.single("profile"), handleRegist);
router.post("/login", handleLogin);
router.post("/tokenR", resetRequest);
router.post("/password", resetPassword2);

router.get("/users", authenticate, authorizeRole("admin"), handleAllUsers);

router.get("/me", limiter, authenticate, (req, res) => {
  res.json({ message: "protected route" });
});

export default router;
