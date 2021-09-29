import { Router } from "express";
import asyncHandler from "express-async-handler";

import {
  createQuestionHandler,
  getAllQuestionsHanlder,
} from "../controllers/index.js";

import { validateRequest } from "../middlewares/validate-request.js";
import { CreateQuestion } from "../validation/index.js";

const questionRoutes = Router();

questionRoutes
  .get("/", asyncHandler(getAllQuestionsHanlder))
  .post(
    "/add",
    validateRequest(CreateQuestion),
    asyncHandler(createQuestionHandler)
  );

export { questionRoutes };
