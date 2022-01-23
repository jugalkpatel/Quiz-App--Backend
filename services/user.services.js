import createError from "http-errors";

import { User } from "../models/index.js";

async function addHistoryRecordInUser(userID, historyID) {
  const updatedUserRecord = await User.findOneAndUpdate(
    { _id: userID },
    { $push: { history: historyID } },
    { new: true }
  );

  return updatedUserRecord;
}

async function getUser(userID) {
  const user = await User.findById(userID);

  if (!user) {
    throw createError.InternalServerError("user not found!");
  }

  return user;
}

async function getUserHistory(userID) {
  const user = await getUser(userID);

  if (!user.history.length) {
    throw createError(204, "quiz history not available");
  }

  await User.populate(user, {
    path: "history",
    select: "-__v -_id -user ",
    populate: { path: "quiz", select: "-_id quizType" },
  });

  const history = user.history.map((item) => {
    return {
      quiz: item.quiz.quizType,
      score: item.score,
      totalTime: item.totalTime,
    };
  });

  return history;
}

export { addHistoryRecordInUser, getUser, getUserHistory };
