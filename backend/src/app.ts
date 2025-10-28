import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import logger from "./utils/logger";
const app = express();

app.use(helmet());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests; try again later." },
});
app.use("/api/auth", authLimiter);
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

function safeSanitizeObject(obj: any) {
  if (!obj || typeof obj !== "object") return obj;
  for (const key of Object.keys(obj)) {
    if (key === "__proto__" || key === "constructor") {
      delete obj[key];
      continue;
    }
    const val = obj[key];
    if (key.includes("$") || key.includes(".")) {
      const cleanKey = key.replace(/\$/g, "_").replace(/\./g, "_");
      obj[cleanKey] = val;
      delete obj[key];
      if (typeof obj[cleanKey] === "object") safeSanitizeObject(obj[cleanKey]);
      continue;
    }
    if (typeof val === "object") safeSanitizeObject(val);
  }
  return obj;
}

app.use((req, _res, next) => {
  try {
    if (req.body) safeSanitizeObject(req.body);
    if (req.query) safeSanitizeObject(req.query);
    if (req.params) safeSanitizeObject(req.params);
  } catch (err) {
    logger.warn("Sanitizer error (continuing):", (err as any)?.message || err);
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));
app.use(errorHandler);

export default app;
