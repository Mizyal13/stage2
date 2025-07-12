import express from "express";
import router from "./routers/transfer";

const app = express();
const PORT = process.env.PORT || 9000;

app.use(express.json());

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  res.status(res.status || 500).json({ error: err.message || "terjadi error" });
});

app.use("/tf", router);

app.listen(PORT, () => {
  console.log("server running");
});
