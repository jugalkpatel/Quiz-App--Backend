import {
  createHistoryRecord,
  getQuiz,
  addHistoryRecordInUser,
  getUserHistory,
  addHistoryRecordInQuiz,
  updateUserLevel,
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
  const levels = ["Rookie", "Skillful", "Expert"];
  const { level, score, time } = req.body;
  const userID = req.userID;
  const { _id: quizID } = await getQuiz(capitalize(level));
  let updatedLevel = level;

  const historyRecord = await createHistoryRecord({
    user: userID,
    level: quizID,
    score,
    time,
  });

  await addHistoryRecordInUser(userID, historyRecord._id);

  const isInLeaderBoard = await addHistoryRecordInQuiz({
    level,
    currentRecord: historyRecord,
  });

  if (isInLeaderBoard) {
    const levelIndex = levels.indexOf(level);

    if (levelIndex < 2) {
      updatedLevel = await updateUserLevel(userID, levels[levelIndex + 1]);
    }
  }

  res.status(201).json({
    success: true,
    details: { isInLeaderBoard, updatedLevel },
  });
}

export { getHistoryHandler, createHistoryHandler };
