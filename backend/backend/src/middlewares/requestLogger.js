import { logger } from "../lib/logger.js";

export function requestLogger(req, res, next) {
  const start = Date.now();

  res.on("finish", () => {
    logger.info(
      {
        method: req.method,
        path: req.originalUrl,
        statusCode: res.statusCode,
        durationMs: Date.now() - start,
      },
      "HTTP request",
    );
  });

  next();
}
