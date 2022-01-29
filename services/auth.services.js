import createError from "http-errors";

import { User } from "../models/index.js";
import { createPassword, validatePassword } from "../services/index.js";
import { getAccessToken } from "../helpers/jwt.helpers.js";

async function registerService({ email, name, password }) {
  const isUserAlreadyExists = await User.findOne({ email });

  if (isUserAlreadyExists) {
    throw createError.Conflict("Email is Already Registered");
  }

  const user = await User.create({ email, name });

  await createPassword({ secret: password, user: user._id });

  const accessToken = await getAccessToken(user._id);

  await User.populate(user, {
    path: "history",
    select: "-user",
    populate: {
      path: "quiz",
      select: "quizType -_id",
    },
  });

  return {
    userId: user._id,
    userName: user.name,
    accessToken,
    level: user.level,
    history: user.history,
  };
}

async function loginService({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) {
    throw createError.NotFound("User is not registered");
  }

  await validatePassword({ user: user._id, password });

  const accessToken = await getAccessToken(user._id);

  await User.populate(user, {
    path: "history",
    select: "-user",
    populate: {
      path: "quiz",
      select: "quizType -_id",
    },
  });

  return {
    userId: user._id,
    userName: user.name,
    accessToken,
    level: user.level,
    history: user.history,
  };
}

export { registerService, loginService };
