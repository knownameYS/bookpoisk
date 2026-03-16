import { Router } from "express";
import { z } from "zod";
import { pool } from "../../db/index.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const booksRouter = Router();

const listQuerySchema = z.object({
  query: z.string().optional(),
  genre: z.string().optional(),
  author: z.string().optional(),
  yearFrom: z.coerce.number().optional(),
  yearTo: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  sort: z.enum(["rating", "year", "title", "new"]).optional(),
});

booksRouter.get("/", asyncHandler(async (req, res) => {
  const q = listQuerySchema.parse(req.query);
  const sortSql = {
    rating: "COALESCE(stats.avg_final_score_84, 0) DESC",
    year: "b.published_year DESC NULLS LAST",
    title: "b.title ASC",
    new: "b.created_at DESC NULLS LAST",
  }[q.sort || "rating"];

  const result = await pool.query(
    `SELECT b.id, b.title, b.description, b.published_year, b.cover_url,
            COALESCE(stats.avg_final_score_84, 0) AS avg_rating,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT a.name), NULL) AS authors,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT g.name), NULL) AS genres
     FROM books b
     LEFT JOIN v_book_rating_stats stats ON stats.book_id = b.id
     LEFT JOIN book_authors ba ON ba.book_id = b.id
     LEFT JOIN authors a ON a.id = ba.author_id
     LEFT JOIN book_genres bg ON bg.book_id = b.id
     LEFT JOIN genres g ON g.id = bg.genre_id
     WHERE ($1::text IS NULL OR b.title ILIKE '%' || $1 || '%')
       AND ($2::text IS NULL OR a.name ILIKE '%' || $2 || '%')
       AND ($3::text IS NULL OR g.name ILIKE '%' || $3 || '%')
       AND ($4::int IS NULL OR b.published_year >= $4)
       AND ($5::int IS NULL OR b.published_year <= $5)
       AND ($6::numeric IS NULL OR COALESCE(stats.avg_final_score_84, 0) >= $6)
     GROUP BY b.id, stats.avg_final_score_84
     ORDER BY ${sortSql}`,
    [q.query ?? null, q.author ?? null, q.genre ?? null, q.yearFrom ?? null, q.yearTo ?? null, q.minRating ?? null],
  );

  res.json({ items: result.rows });
}));

booksRouter.get("/top", asyncHandler(async (req, res) => {
  const limit = Math.min(Number(req.query.limit || 10), 50);
  const result = await pool.query(
    `SELECT b.id, b.title, b.cover_url, stats.avg_final_score_84, stats.ratings_count
     FROM books b
     JOIN v_book_rating_stats stats ON stats.book_id = b.id
     ORDER BY stats.avg_final_score_84 DESC NULLS LAST
     LIMIT $1`,
    [limit],
  );
  res.json({ items: result.rows });
}));

booksRouter.get("/:id", asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    `SELECT b.*, COALESCE(stats.avg_final_score_84,0) AS avg_rating,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT a.name), NULL) AS authors,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT g.name), NULL) AS genres,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT t.name), NULL) AS tags
     FROM books b
     LEFT JOIN v_book_rating_stats stats ON stats.book_id = b.id
     LEFT JOIN book_authors ba ON ba.book_id = b.id
     LEFT JOIN authors a ON a.id = ba.author_id
     LEFT JOIN book_genres bg ON bg.book_id = b.id
     LEFT JOIN genres g ON g.id = bg.genre_id
     LEFT JOIN book_tags bt ON bt.book_id = b.id
     LEFT JOIN tags t ON t.id = bt.tag_id
     WHERE b.id = $1
     GROUP BY b.id, stats.avg_final_score_84`,
    [id],
  );

  if (!result.rowCount) return res.status(404).json({ error: "Book not found" });
  res.json({ item: result.rows[0] });
}));

booksRouter.get("/:id/stats", asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query("SELECT * FROM v_book_rating_stats WHERE book_id = $1", [id]);
  res.json({ item: result.rows[0] || null });
}));

booksRouter.get("/:id/similar", asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const result = await pool.query(
    `WITH target AS (
      SELECT ARRAY_REMOVE(ARRAY_AGG(DISTINCT genre_id), NULL) AS genres,
             ARRAY_REMOVE(ARRAY_AGG(DISTINCT tag_id), NULL) AS tags
      FROM (
        SELECT genre_id, NULL::int AS tag_id FROM book_genres WHERE book_id = $1
        UNION ALL
        SELECT NULL::int AS genre_id, tag_id FROM book_tags WHERE book_id = $1
      ) x
     )
     SELECT b.id, b.title,
            COUNT(DISTINCT bg.genre_id) + COUNT(DISTINCT bt.tag_id) AS overlap_score,
            COALESCE(stats.avg_final_score_84,0) AS avg_rating
     FROM books b
     LEFT JOIN book_genres bg ON bg.book_id = b.id
     LEFT JOIN book_tags bt ON bt.book_id = b.id
     LEFT JOIN target t ON TRUE
     LEFT JOIN v_book_rating_stats stats ON stats.book_id = b.id
     WHERE b.id <> $1
       AND (bg.genre_id = ANY(t.genres) OR bt.tag_id = ANY(t.tags))
     GROUP BY b.id, stats.avg_final_score_84
     ORDER BY overlap_score DESC, avg_rating DESC
     LIMIT 12`,
    [id],
  );
  res.json({ items: result.rows });
}));
