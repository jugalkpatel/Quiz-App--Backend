import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createQuizHandler,
  getQuizHandler,
  getQuizLeaderBoardHandler,
} from "../controllers/index.js";
import { Level } from "../validation/index.js";
import { validateRequest, tokenValidator } from "../middlewares/index.js";

const quizRoutes = Router();

quizRoutes
  .get("/", validateRequest(Level), asyncHandler(getQuizHandler))
  .post("/add", asyncHandler(createQuizHandler))
  .get(
    "/leaderboard",
    validateRequest(Level),
    asyncHandler(getQuizLeaderBoardHandler)
  );

export { quizRoutes };
