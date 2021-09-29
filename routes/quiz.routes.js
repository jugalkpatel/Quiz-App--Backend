import { Router } from "express";
import asyncHandler from "express-async-handler";

import { createQuizHandler, getQuizHandler } from "../controllers/index.js";
import { Quiz } from "../validation/index.js";
import { validateRequest } from "../middlewares/validate-request.js";

const quizRoutes = Router();

quizRoutes
  .get("/", validateRequest(Quiz), asyncHandler(getQuizHandler))
  .post("/add", validateRequest(Quiz), asyncHandler(createQuizHandler));

export { quizRoutes };
