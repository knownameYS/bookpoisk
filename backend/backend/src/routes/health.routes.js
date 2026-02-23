import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { pool } from "../db/index.js";

export const healthRouter = Router();

healthRouter.get("/", asyncHandler(async (req, res) => {
  const dbRes = await pool.query("SELECT now() AS db_time");
  res.json({
    ok: true,
    service: "book-rating-backend",
    time: new Date().toISOString(),
    dbTime: dbRes.rows[0].db_time,
  });
}));