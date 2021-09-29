import { createQuiz } from "../services/quiz.services.js";

async function createQuizHandler(req, res) {
  const { quizType } = req.body;

  console.log(req.body);

  const quiz = await createQuiz({ quizType });

  res.status(201).json({
    success: true,
    message: "Quiz Created Successfully",
    quiz,
  });
}

export { createQuizHandler };
