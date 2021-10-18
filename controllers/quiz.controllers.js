import { createQuiz, getQuiz } from "../services/quiz.services.js";
import { capitalize } from "../utils/capitalize.js";

async function createQuizHandler(req, res) {
  const { quizType } = req.body;

  const quiz = await createQuiz(quizType);

  res.status(201).json({
    success: true,
    message: "Quiz Created Successfully",
    quiz,
  });
}

async function getQuizHandler(req, res) {
  const { quizType } = req.query;

  const quiz = await getQuiz(capitalize(quizType));

  console.log(quiz.questions.length);

  res.status(200).json({
    success: true,
    quiz,
  });
}

export { createQuizHandler, getQuizHandler };
