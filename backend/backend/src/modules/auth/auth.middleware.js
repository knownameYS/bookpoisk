import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { ApiError } from "../../lib/apiError.js";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Missing Bearer token"));
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
    req.user = { id: payload.sub, username: payload.username, email: payload.email };
    return next();
  } catch {
    return next(new ApiError(401, "Invalid or expired access token"));
  }
}
