import express from "express";
import {
  addProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product";
import { authenticate } from "../middlewares/auth";
import { authorizeRole } from "../middlewares/authRole";

const router = express.Router();

router.post("/add", authenticate, authorizeRole("supplier"), addProduct);
router.get("/", authenticate, authorizeRole("supplier"), getMyProducts);
router.put("/:id", authenticate, authorizeRole("supplier"), updateProduct);
router.delete("/:id", authenticate, authorizeRole("supplier"), deleteProduct);

export default router;
