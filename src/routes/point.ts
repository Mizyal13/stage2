import { Router } from "express";
import { handleTransferPoints } from "../controllers/point";
import { authenticate } from "../middlewares/authenticate";

const router = Router();

router.post("/transfer", authenticate, handleTransferPoints);

export default router;
