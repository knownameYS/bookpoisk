import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../db/index.js";
import { env } from "../../config/env.js";
import { ApiError } from "../../lib/apiError.js";

const REFRESH_COOKIE_NAME = "refreshToken";

function signAccessToken(user) {
  return jwt.sign({ sub: user.id, username: user.username, email: user.email }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.ACCESS_TTL,
  });
}

function signRefreshToken(userId) {
  return jwt.sign({ sub: userId, type: "refresh" }, env.JWT_REFRESH_SECRET, {
    expiresIn: `${env.REFRESH_TTL_DAYS}d`,
  });
}

export const refreshCookieOptions = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/api/auth",
  maxAge: env.REFRESH_TTL_DAYS * 24 * 60 * 60 * 1000,
};

async function storeRefreshToken(userId, token) {
  await pool.query(
    `UPDATE users
     SET refresh_token_hash = $2, refresh_token_expires_at = NOW() + ($3::text || ' days')::interval
     WHERE id = $1`,
    [userId, await bcrypt.hash(token, 10), String(env.REFRESH_TTL_DAYS)],
  );
}

export async function register({ username, email, password }) {
  const existing = await pool.query(
    "SELECT id FROM users WHERE lower(email)=lower($1) OR lower(username)=lower($2) LIMIT 1",
    [email, username],
  );
  if (existing.rowCount) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users(username, email, password_hash)
     VALUES ($1,$2,$3)
     RETURNING id, username, email, created_at`,
    [username, email, passwordHash],
  );
  const user = result.rows[0];
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user.id);
  await storeRefreshToken(user.id, refreshToken);

  return { user, accessToken, refreshToken };
}

export async function login({ login, password }) {
  const result = await pool.query(
    `SELECT id, username, email, password_hash, created_at, refresh_token_hash, refresh_token_expires_at
     FROM users
     WHERE lower(email)=lower($1) OR lower(username)=lower($1)
     LIMIT 1`,
    [login],
  );

  const user = result.rows[0];
  if (!user) throw new ApiError(401, "Invalid credentials");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new ApiError(401, "Invalid credentials");

  const safeUser = {
    id: user.id,
    username: user.username,
    email: user.email,
    created_at: user.created_at,
  };

  const accessToken = signAccessToken(safeUser);
  const refreshToken = signRefreshToken(user.id);
  await storeRefreshToken(user.id, refreshToken);

  return { user: safeUser, accessToken, refreshToken };
}

export async function refresh(token) {
  let payload;
  try {
    payload = jwt.verify(token, env.JWT_REFRESH_SECRET);
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const result = await pool.query(
    `SELECT id, username, email, refresh_token_hash, refresh_token_expires_at
     FROM users WHERE id = $1 LIMIT 1`,
    [payload.sub],
  );
  const user = result.rows[0];

  if (!user?.refresh_token_hash) {
    throw new ApiError(401, "Refresh token revoked");
  }

  if (user.refresh_token_expires_at && new Date(user.refresh_token_expires_at) < new Date()) {
    throw new ApiError(401, "Refresh token expired");
  }

  const matched = await bcrypt.compare(token, user.refresh_token_hash);
  if (!matched) throw new ApiError(401, "Invalid refresh token");

  const accessToken = signAccessToken(user);
  const newRefreshToken = signRefreshToken(user.id);
  await storeRefreshToken(user.id, newRefreshToken);

  return { accessToken, refreshToken: newRefreshToken };
}

export async function logout(userId) {
  if (!userId) return;
  await pool.query(
    "UPDATE users SET refresh_token_hash = NULL, refresh_token_expires_at = NULL WHERE id = $1",
    [userId],
  );
}

export function decodeRefreshToken(token) {
  try {
    const payload = jwt.verify(token, env.JWT_REFRESH_SECRET);
    return payload.sub;
  } catch {
    return null;
  }
}

export async function getMe(userId) {
  const result = await pool.query(
    "SELECT id, username, email, created_at FROM users WHERE id = $1",
    [userId],
  );
  if (!result.rowCount) throw new ApiError(404, "User not found");
  return result.rows[0];
}

export { REFRESH_COOKIE_NAME };
