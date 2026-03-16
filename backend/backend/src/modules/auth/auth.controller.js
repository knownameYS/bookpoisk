import { registerSchema, loginSchema } from "./auth.validation.js";
import {
  REFRESH_COOKIE_NAME,
  decodeRefreshToken,
  getMe,
  login,
  logout,
  refresh,
  refreshCookieOptions,
  register,
} from "./auth.service.js";
import { ApiError } from "../../lib/apiError.js";

export async function registerController(req, res) {
  const data = registerSchema.parse(req.body);
  const result = await register(data);
  res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, refreshCookieOptions);
  res.status(201).json({ user: result.user, accessToken: result.accessToken });
}

export async function loginController(req, res) {
  const data = loginSchema.parse(req.body);
  const result = await login(data);
  res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, refreshCookieOptions);
  res.json({ user: result.user, accessToken: result.accessToken });
}

export async function refreshController(req, res) {
  const token = req.cookies?.[REFRESH_COOKIE_NAME];
  if (!token) throw new ApiError(401, "Missing refresh token cookie");
  const result = await refresh(token);
  res.cookie(REFRESH_COOKIE_NAME, result.refreshToken, refreshCookieOptions);
  res.json({ accessToken: result.accessToken });
}

export async function logoutController(req, res) {
  const token = req.cookies?.[REFRESH_COOKIE_NAME];
  const userIdFromToken = token ? decodeRefreshToken(token) : null;
  await logout(req.user?.id ?? userIdFromToken);

  res.clearCookie(REFRESH_COOKIE_NAME, { ...refreshCookieOptions, maxAge: undefined });
  res.status(204).send();
}

export async function meController(req, res) {
  const user = await getMe(req.user.id);
  res.json({ user });
}
