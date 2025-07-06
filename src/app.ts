import express from "express";
import cookieParser from "cookie-parser";
import limiter from "./middlewares/rate-limiter";
// import corss from "./middlewares/cors";
import users from "./routes/user";
import products from "./routes/product";
import orders from "./routes/order";
import points from "./routes/point";

const app = express();
const PORT = process.env.PORT || 6666;

app.use(limiter);
// app.use(corss);
app.use(express.json());
app.use(cookieParser());

app.use("/user", users);
app.use("/product", products);
app.use("/order", orders);
app.use("/point", points);

app.listen(PORT, () => {
  console.log(`server telah berjalan di ${PORT}`);
});
