import express from "express";
import user from "./routers/auth";
import products from "./routers/product";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middlewares/cors";
import limiter from "./middlewares/rate-limiter";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(corsMiddleware);
app.use(limiter);

app.use("/uploads", express.static("src/uploads"));
app.use("/user", user);
app.use("/products", products);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`server running `);
});
