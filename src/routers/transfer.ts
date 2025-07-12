import express from "express";
import { transferPoint, userPoint } from "../controllers/transfer";

const router = express.Router();

router.post("/transfer", transferPoint);
router.get("/point/:id", userPoint);

export default router;
