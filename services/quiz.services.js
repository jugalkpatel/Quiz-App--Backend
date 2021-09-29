import { Quiz } from "../models/quiz.model.js";
import createError from "http-errors";

async function createQuiz({ quizType }) {
  const quiz = await Quiz.create({ quizType });

  console.log(quiz);

  if (!quiz) {
    throw createError.InternalServerError("Error occured while creating quiz");
  }

  return quiz;
}

export { createQuiz };
