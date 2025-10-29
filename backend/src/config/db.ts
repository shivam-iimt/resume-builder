// src/config/db.ts
import mongoose from "mongoose";
import { env } from "./env";
import logger from "../utils/logger";

export async function connectDB() {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info("✅ MongoDB connected successfully");
  } catch (error) {
    logger.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    logger.info("🛑 MongoDB disconnected");
  } catch (error) {
    logger.error("Error while disconnecting MongoDB:", error);
  }
}
