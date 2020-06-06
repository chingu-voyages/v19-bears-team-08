const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = function verifyToken(req, res, next) {
  try {
    // will throw an error if the JWT isn't valid
    const decoded = jwt.verify(res.locals.token, process.env.TOKEN_SECRET);

    // allows the userId in the token to be accessible in the next middleware
    res.locals.userId = decoded.userId;

    // this will run the next middleware or route controller
    next();
  } catch (err) {
    // if the token isn't valid, this runs and our global error ...
    // ... handler catches this error and sends it to the user
    next(err);
  }
};
