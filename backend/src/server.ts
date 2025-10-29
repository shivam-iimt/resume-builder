import dotenv from "dotenv";
dotenv.config();
import { env } from "./config/env";
import { connectDB, disconnectDB } from "./config/db";
import app from "./app";
import logger from "./utils/logger";

const PORT = Number(env.PORT) || 8000;
async function startServer() {
  try {
    await connectDB();
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
    const gracefulShutdown = (signal: string) => {
      logger.info(`Received ${signal}. Closing server...`);
      server.close(async () => {
        try {
          await disconnectDB();
          logger.info("✅ MongoDB disconnected. Exiting.");
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
startServer();
