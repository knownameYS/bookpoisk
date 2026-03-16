import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().trim().min(3).max(50),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(100),
});

export const loginSchema = z.object({
  login: z.string().trim().min(3).max(255),
  password: z.string().min(1).max(100),
});

export const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

export const ratingSchema = z.object({
  architecture: z.number().min(0).max(100),
  characters: z.number().min(0).max(100),
  lang_style: z.number().min(0).max(100),
  idea: z.number().min(0).max(100),
  vibe: z.number().min(0).max(100),
});
