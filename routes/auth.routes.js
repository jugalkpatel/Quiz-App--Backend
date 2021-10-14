import { Router } from "express";
import asyncHandler from "express-async-handler";
const authRoutes = Router();
import {
  registerHandler,
  loginHandler,
  logoutHandler,
} from "../controllers/index.js";

import { Register, Login } from "../validation/index.js";
import { validateRequest, tokenValidator } from "../middlewares/index.js";

authRoutes
  .post("/register", validateRequest(Register), asyncHandler(registerHandler))
  .post("/login", validateRequest(Login), asyncHandler(loginHandler))
  .post("/logout", tokenValidator, asyncHandler(logoutHandler));

export { authRoutes };
