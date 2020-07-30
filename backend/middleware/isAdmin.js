const createError = require("http-errors");
const User = require("../model/User");

module.exports = async function isAdmin(req, res, next) {
  try {
    // this comes from the verifyToken middleware
    const { userId } = res.locals;

    // find the user
    const user = await User.findById(userId);
    if (!user) throw createError(400, `User(${userId}) not found`);

    // check if user has the admin role
    if (user.roles.includes("admin")) {
      throw createError(401, "Not Authorized: Invalid Role");
    }

    // allows the user object in the token to be accessible in the next middleware
    res.locals.user = user;

    // this will run the next middleware or route controller
    next();
  } catch (err) {
    // if the token isn't valid, this runs and our global error ...
    // ... handler catches this error and sends it to the user
    next(err);
  }
};
