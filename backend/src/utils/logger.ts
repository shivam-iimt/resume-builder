import pino from "pino";

const level =
  process.env.LOG_LEVEL ||
  (process.env.NODE_ENV === "production" ? "info" : "debug");
const logger = pino({
  level,
  base: { pid: false },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default {
  info: (msg: any, ...args: any[]) => logger.info(msg, ...args),
  warn: (msg: any, ...args: any[]) => logger.warn(msg, ...args),
  error: (msg: any, ...args: any[]) => logger.error(msg, ...args),
  debug: (msg: any, ...args: any[]) => logger.debug(msg, ...args),
};
