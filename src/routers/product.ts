import express from "express";
import {
  addProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "../controllers/product";
import { authenticate } from "../middlewares/auth";
import { authorizeRole } from "../middlewares/authRole";
import { upload } from "../utils/multer";
import { authSupplier } from "../middlewares/authSup";

const router = express.Router();

router.post("/add", authenticate, authorizeRole("supplier"), addProduct);
router.get("/", authenticate, authorizeRole("supplier"), getMyProducts);
router.put("/:id", authenticate, authorizeRole("supplier"), updateProduct);
router.delete("/:id", authenticate, authorizeRole("supplier"), deleteProduct);

router.post(
  "/upload-image",
  authSupplier,
  upload.single("image"),
  uploadProductImage
);

export default router;
