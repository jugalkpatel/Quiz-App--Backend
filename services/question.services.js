import { Question } from "../models/index.js";
import createError from "http-errors";
async function createQuestion({ question, options, answers }) {
  const addedQuestion = await Question.create({ question, options, answers });

  if (!addedQuestion) {
    throw createError.InternalServerError("Failed to create Question");
  }

  return addedQuestion;
}

export { createQuestion };
