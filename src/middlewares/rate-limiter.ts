import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  message: "weh jangan dipaksa dong ntr lagi coba setelah 1 menit",
});

// Apply the rate limiting middleware to all requests.
export default limiter;
