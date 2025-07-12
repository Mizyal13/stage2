import express from "express";
import { updateSupplierStocks } from "../controllers/stockController";

const router = express.Router();

router.post("/suppliers/stock", updateSupplierStocks);

export default router;
