// add this to a route if you only want it available in dev environments
module.exports = function (req, res, next) {
  try {
    if (process.env.NODE_ENV === "production") {
      throw createError(401, "Not authorized in production");
    }
    next();
  } catch (err) {
    next(err);
  }
};
