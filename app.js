import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import asyncHandler from "express-async-handler";

import connect from "./db/connect.js";
import { authRoutes, quizRoutes, questionRoutes } from "./routes/index.js";
import { errorHandler } from "./middlewares/error-handler.js";
import { tokenValidator } from "./middlewares/token-validator.js";

config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", asyncHandler(tokenValidator), (req, res) => {
  res.send("hello, world");
});

app.use("/auth", authRoutes);
app.use("/questions", questionRoutes);
app.use("/quiz", quizRoutes);

app.use((req, res, next) => {
  return next(createError.NotFound(`${req.url} route does not exist`));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}/`);
  connect();
});
