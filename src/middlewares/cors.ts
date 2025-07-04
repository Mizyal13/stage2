import cors from "cors";

export const corsMiddleware = cors({
  origin: "http://localhost:1000",
  credentials: true,
});
