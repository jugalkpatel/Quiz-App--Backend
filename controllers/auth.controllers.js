import createError from "http-errors";
import { registerService, loginService } from "../services/index.js";
import { deleteCookies } from "../utils/deleteCookies.js";

const registerHandler = async (req, res) => {
  const { userId, userName, accessToken, level } = await registerService(
    req.body
  );

  // res.cookie("accessToken", accessToken, {
  //   maxAge: 300000,
  //   httpOnly: true,
  // });

  // res.cookie("refreshToken", refreshToken, {
  //   maxAge: new Date(Date.now() + 365 * 86400000),
  //   httpOnly: true,
  // });

  res.status(201).json({
    success: true,
    message: "Registered Successfully",
    user: { id: userId, name: userName, token: accessToken, level },
  });
};

const loginHandler = async (req, res) => {
  const { userId, userName, accessToken, level } = await loginService(req.body);

  // res.cookie("accessToken", accessToken, {
  //   maxAge: new Date(Date.now() + 15 * 60 * 1000),
  //   httpOnly: true,
  // });

  // res.cookie("refreshToken", refreshToken, {
  //   maxAge: new Date(Date.now() + 365 * 86400000),
  //   httpOnly: true,
  // });

  setTimeout(() => {
    res.status(201).json({
      success: true,
      message: "Registered Successfully",
      user: { id: userId, name: userName, token: accessToken, level },
    });
  }, 5000);

  // res.status(201).json({
  //   success: true,
  //   message: "Authenticated Successfully",
  //   user: { id: userId, name: userName, token: accessToken, level },
  // });
};

const logoutHandler = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    throw createError.BadRequest("UserID required");
  }

  deleteCookies(res);

  res.status(201).send({
    success: true,
    message: "Logout Successfull",
  });
};

export { registerHandler, loginHandler, logoutHandler };
