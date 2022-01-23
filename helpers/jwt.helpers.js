import jwt, { decode } from "jsonwebtoken";
import createError from "http-errors";

function getAccessToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { user: userId },
      process.env.ACC_KEY,
      { expiresIn: "1w" },
      function (err, token) {
        if (err) return reject(createError.InternalServerError());
        resolve(token);
      }
    );
  });
}

function verifyAccessToken(token) {
  const tokenData = jwt.verify(
    token,
    process.env.ACC_KEY,
    function (err, decoded) {
      if (err) {
        return {
          payload: null,
          isExpired: err.message.includes("jwt expired"),
        };
      }

      return { payload: decoded.user, isExpired: false };
    }
  );

  return tokenData;
}

export { getAccessToken, verifyAccessToken };
