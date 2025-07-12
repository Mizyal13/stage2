import express from "express";
import supplierRoutes from "./routes/supplierRoute";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use(supplierRoutes);
app.use(errorHandler);

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
