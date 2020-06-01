const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw createError(400, "Authorization header is missing");

    const authHeaderStrings = authHeader.split(" ");
    if (authHeaderStrings[0] !== "Bearer") {
      throw createError(
        400,
        "Authorization header should've started with Bearer"
      );
    }

    // this is just the jwt token string
    const token = authHeaderStrings[1];

    // will throw an error if the JWT isn't valid
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    console.log(decoded);
    // this will run the next middleware or route controller
    next();
  } catch (err) {
    // if the token isn't valid, this runs and our global error ...
    // ... handler catches this error and sends it to the user
    next(err);
  }
};
