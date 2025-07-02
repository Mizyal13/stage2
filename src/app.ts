import express from "express";
import user from "./routers/auth";
import products from "./routers/product";

const app = express();
app.use(express.json());

app.use("/user", user);
app.use("/products", products);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`server running `);
});
