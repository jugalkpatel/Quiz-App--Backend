import { v1 as uuidv1 } from "uuid";

import {
  createQuiz,
  getQuiz,
  getQuizLeaderBoard,
} from "../services/quiz.services.js";

import { capitalize } from "../utils/index.js";

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
  const { level } = req.query;
  let leaderBoard = await getQuizLeaderBoard(level);

  if (!leaderBoard) {
    res.status(200).json({
      success: true,
      leaderBoard: [],
    });
  }

  leaderBoard = leaderBoard.map((record) => {
    return {
      id: uuidv1(),
      user: record.user.name,
      score: record.score,
      time: record.time,
    };
  });

  res.status(200).json({
    success: true,
    level,
    leaderBoard,
  });
}

export { createQuizHandler, getQuizHandler, getQuizLeaderBoardHandler };
