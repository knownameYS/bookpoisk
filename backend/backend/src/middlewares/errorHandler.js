import { ZodError } from "zod";
import { logger } from "../lib/logger.js";

export function errorHandler(err, req, res, next) {
  logger.error({ err, path: req.originalUrl, method: req.method }, "Unhandled error");

  if (err instanceof ZodError) {
    return res.status(400).json({ error: "Validation error", details: err.issues });
  }

  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  return res.status(status).json({ error: message, details: err.details ?? undefined });
}
