import pg from "pg";
import { env } from "../config/env.js";
import { logger } from "../lib/logger.js";

export const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
});

pool.on("error", (err) => {
  logger.error({ err }, "Unexpected PostgreSQL pool error");
});

export async function checkDbConnection() {
  const client = await pool.connect();
  try {
    await client.query("SELECT 1");
  } finally {
    client.release();
  }
}