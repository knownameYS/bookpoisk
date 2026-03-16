import { Router } from "express";
import { healthRouter } from "./health.routes.js";
import { authRouter } from "../modules/auth/auth.routes.js";
import { booksRouter } from "../modules/books/books.routes.js";
import { ratingsRouter } from "../modules/ratings/ratings.routes.js";
import { reviewsRouter } from "../modules/reviews/reviews.routes.js";
import { articlesRouter } from "../modules/articles/articles.routes.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/books", booksRouter);
apiRouter.use("/", ratingsRouter);
apiRouter.use("/", reviewsRouter);
apiRouter.use("/", articlesRouter);
