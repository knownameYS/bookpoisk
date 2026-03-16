import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {
  loginController,
  logoutController,
  meController,
  refreshController,
  registerController,
} from "./auth.controller.js";
import { requireAuth } from "./auth.middleware.js";

export const authRouter = Router();

authRouter.post("/register", asyncHandler(registerController));
authRouter.post("/login", asyncHandler(loginController));
authRouter.post("/refresh", asyncHandler(refreshController));
authRouter.post("/logout", asyncHandler(logoutController));
authRouter.get("/me", requireAuth, asyncHandler(meController));
