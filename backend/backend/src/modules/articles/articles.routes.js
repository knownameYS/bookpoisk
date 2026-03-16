import { Router } from "express";
import { z } from "zod";
import { pool } from "../../db/index.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth } from "../auth/auth.middleware.js";

export const articlesRouter = Router();

const articleSchema = z.object({
  title: z.string().trim().min(1).max(255),
  body: z.string().trim().min(1),
  book_id: z.number().int().positive().optional(),
});

const commentSchema = z.object({
  body: z.string().trim().min(1),
});

articlesRouter.get("/articles", asyncHandler(async (req, res) => {
  const sort = req.query.sort === "top" ? "top" : "new";
  const sortSql = sort === "top" ? "COALESCE(a.likes_count,0) DESC, a.created_at DESC" : "a.created_at DESC";
  const result = await pool.query(
    `SELECT a.*, u.username
     FROM articles a
     JOIN users u ON u.id = a.user_id
     ORDER BY ${sortSql}`,
  );

  res.json({ items: result.rows });
}));

articlesRouter.post("/articles", requireAuth, asyncHandler(async (req, res) => {
  const body = articleSchema.parse(req.body);
  const result = await pool.query(
    `INSERT INTO articles(user_id, title, body, book_id)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [req.user.id, body.title, body.body, body.book_id ?? null],
  );

  res.status(201).json({ item: result.rows[0] });
}));

articlesRouter.post("/articles/:id/comments", requireAuth, asyncHandler(async (req, res) => {
  const articleId = Number(req.params.id);
  const body = commentSchema.parse(req.body);
  const result = await pool.query(
    `INSERT INTO article_comments(article_id, user_id, body)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [articleId, req.user.id, body.body],
  );

  res.status(201).json({ item: result.rows[0] });
}));
