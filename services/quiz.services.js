import { Quiz } from "../models/quiz.model.js";
import createError from "http-errors";

async function createQuiz(quizType) {
  const quiz = await Quiz.create({ quizType });

  if (!quiz) {
    throw createError.InternalServerError("Error occurred while creating quiz");
  }

  return quiz;
}

async function getQuiz(quizType) {
  const quiz = await Quiz.findOne({ quizType });

  if (!quiz) {
    throw createError.NotFound("Error occurred while finding quiz");
  }

  await Quiz.populate(quiz, {
    path: "questions",
    select: "-difficulty",
  });

  return quiz;
}

export { createQuiz, getQuiz };
