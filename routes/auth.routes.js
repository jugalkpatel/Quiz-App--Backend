import { Router } from "express";
import asyncHandler from "express-async-handler";
import { tokenValidator } from "../middlewares/token-validator.js";

const authRoutes = Router();
import {
  registerHandler,
  loginHandler,
  logoutHandler,
} from "../controllers/index.js";

import { Register, Login } from "../validation/index.js";
import { validateRequest } from "../middlewares/validate-request.js";

authRoutes
  .post("/register", validateRequest(Register), asyncHandler(registerHandler))
  .post("/login", validateRequest(Login), asyncHandler(loginHandler))
  .post("/logout", tokenValidator, asyncHandler(logoutHandler));

export { authRoutes };
