import {
  createQuiz,
  getQuiz,
  getQuizLeaderBoard,
} from "../services/quiz.services.js";

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
  const { level } = req.query;
  const quiz = await getQuiz(capitalize(level));

  res.status(200).json({
    success: true,
    quiz,
  });
}

async function getQuizLeaderBoardHandler(req, res) {
  const { level } = req.body;
  let leaderBoard = await getQuizLeaderBoard(level);

  if (!leaderBoard) {
    res.status(200).json({
      success: true,
      leaderBoard: [],
    });
  }

  leaderBoard = leaderBoard.map((record) => {
    return {
      user: record.user.name,
      score: record.score,
      time: record.totalTime,
    };
  });

  res.status(200).json({
    success: true,
    level,
    leaderBoard,
  });
}

export { createQuizHandler, getQuizHandler, getQuizLeaderBoardHandler };
