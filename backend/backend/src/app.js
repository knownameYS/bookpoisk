import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import { env } from "./config/env.js";
import { requestLogger } from "./middlewares/requestLogger.js";
import { apiRouter } from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

export const app = express();

app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get("/", (req, res) => {
  res.json({
    message: "Book Rating Service API",
    version: "1.0.0",
  });
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);