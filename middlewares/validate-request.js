function validateRequest(schema) {
  return async function (req, res, next) {
    try {
      await schema.validate(req.body);
      return next();
    } catch (err) {
      return next(err);
    }
  };
}

export { validateRequest };
