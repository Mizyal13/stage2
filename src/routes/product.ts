import { Router } from "express";
import {
  handleCreateProduct,
  handleProducts,
  handleRestore,
  handleSoftDelete,
  handleUpdateProduct,
} from "../controllers/product";
import { isAdmin } from "../middlewares/roleAdmin";
import { upload } from "../utils/multer";

const router = Router();

router.get("/", handleProducts);
router.post("/create", isAdmin, upload.single("image"), handleCreateProduct);
router.patch("/:id", isAdmin, upload.single("image"), handleUpdateProduct);
router.delete("/:id", isAdmin, handleSoftDelete);
router.patch("/:id/restore", isAdmin, handleRestore);

export default router;
