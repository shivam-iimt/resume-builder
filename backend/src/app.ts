import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import compression from "compression";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN, credentials: true }));
app.use(compression());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.use(errorHandler);

export default app;
