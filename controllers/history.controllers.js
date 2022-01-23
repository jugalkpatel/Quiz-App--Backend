import {
  createHistoryRecord,
  getQuiz,
  addHistoryRecordInUser,
  getUserHistory,
  addHistoryRecordInQuiz,
} from "../services/index.js";

import { capitalize } from "../utils/capitalize.js";

async function getHistoryHandler(req, res) {
  const userID = req.userID;

  const history = await getUserHistory(userID);

  res.status(201).json({
    success: true,
    history,
  });
}

async function createHistoryHandler(req, res) {
  const { level, score, totalTime } = req.body;
  const userID = req.userID;
  const { _id: quizID } = await getQuiz(capitalize(level));

  const historyRecord = await createHistoryRecord({
    user: userID,
    level: quizID,
    score,
    time: totalTime,
  });

  await addHistoryRecordInUser(userID, historyRecord._id);

  const isInLeaderBoard = await addHistoryRecordInQuiz({
    level,
    currentRecord: historyRecord,
  });

  res.status(201).json({
    success: true,
    isInLeaderBoard,
  });
}

export { getHistoryHandler, createHistoryHandler };
