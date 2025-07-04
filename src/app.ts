import express from "express";
import cookieParser from "cookie-parser";
import limiter from "./middlewares/rate-limiter";
// import corss from "./middlewares/cors";
import users from "./routes/user";

const app = express();
const PORT = process.env.PORT || 6666;

app.use(limiter);
// app.use(corss);
app.use(express.json());
app.use(cookieParser());

app.use("/user", users);

app.listen(PORT, () => {
  console.log(`server telah berjalan di ${PORT}`);
});
