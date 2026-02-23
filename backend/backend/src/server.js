import { app } from "./app.js";
import { env } from "./config/env.js";
import { checkDbConnection } from "./db/index.js";
import { logger } from "./lib/logger.js";

async function start() {
  try {
    await checkDbConnection();
    logger.info("✅ PostgreSQL connected");

    app.listen(env.PORT, () => {
      logger.info(`🚀 Server started on http://localhost:${env.PORT}`);
    });
  } catch (err) {
    logger.error({ err }, "❌ Failed to start server");
    process.exit(1);
  }
}

start();