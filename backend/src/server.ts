// backend/src/index.ts
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";
import logger from "./utils/logger";

const PORT = Number(process.env.PORT || 8000);

// Validate required environment variables early
const requiredEnv = [
  "MONGO_URI",
  "ACCESS_TOKEN_SECRET",
  "REFRESH_TOKEN_SECRET",
  "FRONTEND_ORIGIN",
];
const missing = requiredEnv.filter((k) => !process.env[k]);
if (missing.length) {
  logger.error(`Missing required environment variables: ${missing.join(", ")}`);
  process.exit(1);
}

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      // useUnifiedTopology and useNewUrlParser are defaults in modern mongoose
      autoIndex: true,
    });
    logger.info("MongoDB connected");
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}. Closing server...`);
      server.close(async () => {
        try {
          await mongoose.disconnect();
          logger.info("MongoDB disconnected. Exiting.");
          process.exit(0);
        } catch (err) {
          logger.error("Error during graceful shutdown", err);
          process.exit(1);
        }
      });
    };
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("uncaughtException", (err) => {
      logger.error("Uncaught Exception:", err);
      process.exit(1);
    });
    process.on("unhandledRejection", (reason) => {
      logger.error("Unhandled Rejection:", reason);
      process.exit(1);
    });
  } catch (err) {
    logger.error("Failed to start server", err);
    process.exit(1);
  }
}
start();
