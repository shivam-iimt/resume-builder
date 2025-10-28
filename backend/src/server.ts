import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import app from "./app";
import logger from "./utils/logger";

if (!process.env.MONGO_URI) {
  logger.error("❌ Missing MONGO_URI in .env");
  process.exit(1);
}
if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  logger.error("❌ Missing JWT secrets in .env");
  process.exit(1);
}

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    logger.info("MongoDB connected");
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    logger.error("MongoDB connection error", err);
    process.exit(1);
  });
