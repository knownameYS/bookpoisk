import { logger } from "../lib/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error({ err, path: req.originalUrl, method: req.method }, "Unhandled error");

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    error: message,
  });
}