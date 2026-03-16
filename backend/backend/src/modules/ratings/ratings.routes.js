import { Router } from "express";
import { z } from "zod";
import { pool } from "../../db/index.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { requireAuth } from "../auth/auth.middleware.js";

export const ratingsRouter = Router();

const ratingBodySchema = z.object({
  architecture: z.number().min(0).max(100),
  characters: z.number().min(0).max(100),
  lang_style: z.number().min(0).max(100),
  idea: z.number().min(0).max(100),
  vibe: z.number().min(0).max(100),
});

ratingsRouter.post("/books/:id/rating", requireAuth, asyncHandler(async (req, res) => {
  const bookId = Number(req.params.id);
  const body = ratingBodySchema.parse(req.body);

  const result = await pool.query(
    `INSERT INTO ratings(book_id, user_id, architecture, characters, lang_style, idea, vibe)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (book_id, user_id)
     DO UPDATE SET architecture = EXCLUDED.architecture,
                   characters = EXCLUDED.characters,
                   lang_style = EXCLUDED.lang_style,
                   idea = EXCLUDED.idea,
                   vibe = EXCLUDED.vibe,
                   updated_at = NOW()
     RETURNING *`,
    [bookId, req.user.id, body.architecture, body.characters, body.lang_style, body.idea, body.vibe],
  );

  res.status(201).json({ item: result.rows[0] });
}));

ratingsRouter.delete("/books/:id/rating", requireAuth, asyncHandler(async (req, res) => {
  const bookId = Number(req.params.id);
  await pool.query("DELETE FROM ratings WHERE book_id = $1 AND user_id = $2", [bookId, req.user.id]);
  res.status(204).send();
}));

ratingsRouter.get("/books/:id/my-rating", requireAuth, asyncHandler(async (req, res) => {
  const bookId = Number(req.params.id);
  const result = await pool.query("SELECT * FROM ratings WHERE book_id = $1 AND user_id = $2", [bookId, req.user.id]);
  res.json({ item: result.rows[0] || null });
}));
