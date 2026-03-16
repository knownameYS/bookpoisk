import { Router } from "express";
import { z } from "zod";
import { pool } from "../../db/index.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth } from "../auth/auth.middleware.js";

export const reviewsRouter = Router();

const reviewSchema = z.object({
  title: z.string().trim().min(1).max(255),
  body: z.string().trim().min(1),
  is_spoiler: z.boolean().default(false),
});

const commentSchema = z.object({
  body: z.string().trim().min(1),
});

reviewsRouter.get("/books/:id/reviews", asyncHandler(async (req, res) => {
  const bookId = Number(req.params.id);
  const sort = req.query.sort === "top" ? "top" : "new";
  const sortSql = sort === "top" ? "COALESCE(r.likes_count,0) DESC, r.created_at DESC" : "r.created_at DESC";
  const result = await pool.query(
    `SELECT r.*, u.username
     FROM reviews r
     JOIN users u ON u.id = r.user_id
     WHERE r.book_id = $1
     ORDER BY ${sortSql}`,
    [bookId],
  );

  res.json({ items: result.rows });
}));

reviewsRouter.post("/books/:id/reviews", requireAuth, asyncHandler(async (req, res) => {
  const bookId = Number(req.params.id);
  const body = reviewSchema.parse(req.body);
  const result = await pool.query(
    `INSERT INTO reviews(book_id, user_id, title, body, is_spoiler)
     VALUES ($1,$2,$3,$4,$5)
     ON CONFLICT (book_id, user_id)
     DO UPDATE SET title = EXCLUDED.title,
                   body = EXCLUDED.body,
                   is_spoiler = EXCLUDED.is_spoiler,
                   updated_at = NOW()
     RETURNING *`,
    [bookId, req.user.id, body.title, body.body, body.is_spoiler],
  );

  res.status(201).json({ item: result.rows[0] });
}));

reviewsRouter.post("/reviews/:id/comments", requireAuth, asyncHandler(async (req, res) => {
  const reviewId = Number(req.params.id);
  const body = commentSchema.parse(req.body);
  const result = await pool.query(
    `INSERT INTO review_comments(review_id, user_id, body)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [reviewId, req.user.id, body.body],
  );
  res.status(201).json({ item: result.rows[0] });
}));
