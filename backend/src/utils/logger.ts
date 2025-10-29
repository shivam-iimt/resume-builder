import pino from "pino";
import { Response } from "express";

const level =
  process.env.LOG_LEVEL ||
  (process.env.NODE_ENV === "production" ? "info" : "debug");

const logger = pino({
  level,
  base: { pid: false },
  timestamp: pino.stdTimeFunctions.isoTime,
});

const customLogger = {
  info: (msg: any, ...args: any[]) => logger.info(msg, ...args),
  warn: (msg: any, ...args: any[]) => logger.warn(msg, ...args),
  error: (msg: any, ...args: any[]) => logger.error(msg, ...args),
  debug: (msg: any, ...args: any[]) => logger.debug(msg, ...args),

  handleServiceError: (res: Response, err: any, status = 400) => {
    const message =
      err?.message ||
      (typeof err === "string" ? err : "An unexpected error occurred.");
    logger.error(err);
    return res.status(status).json({ success: false, message });
  },
};

export default customLogger;
