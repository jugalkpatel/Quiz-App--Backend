import { Router } from "express";
import asyncHandler from "express-async-handler";

import { History } from "../validation/index.js";
import {
  validateRequest,
  tokenValidator,
  userValidator,
} from "../middlewares/index.js";
import {
  createHistoryHandler,
  getHistoryHandler,
} from "../controllers/history.controllers.js";

const historyRoutes = Router();

historyRoutes.get(
  "/",
  tokenValidator,
  userValidator,
  asyncHandler(getHistoryHandler)
);

historyRoutes.post(
  "/add",
  validateRequest(History),
  tokenValidator,
  userValidator,
  asyncHandler(createHistoryHandler)
);

export { historyRoutes };
