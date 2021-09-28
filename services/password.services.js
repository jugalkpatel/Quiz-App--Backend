import { Password } from "../models/index.js";
import createError from "http-errors";

async function createPassword({ secret, user }) {
  await Password.create({ secret, user });
}

async function validatePassword({ user, password }) {
  const actualPassword = await Password.findOne({ user: user._id });

  const isPasswordValid = await actualPassword.comparePasswords(password);

  if (!isPasswordValid) {
    throw createError.Unauthorized("Email or Password is Invalid");
  }
}

export { createPassword, validatePassword };
