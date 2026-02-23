import { Router } from "express";
import { healthRouter } from "./health.routes.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);

// Дальше подключим:
// apiRouter.use("/auth", authRouter);
// apiRouter.use("/books", booksRouter);
// apiRouter.use("/ratings", ratingsRouter);
// apiRouter.use("/reviews", reviewsRouter);
// apiRouter.use("/articles", articlesRouter);