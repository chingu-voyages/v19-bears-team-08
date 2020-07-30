const createError = require("http-errors");
const User = require("../model/User");

module.exports = async function isOwner(req, res, next) {
  try {
    // grab the owner's id from the
    const ownerId = req.query.ownerId || req.params.ownerId || req.body.ownerId;

    // this comes from the verifyToken middleware
    const { userId } = res.locals;

    // throw an error if user isn't the owner
    if (userId !== ownerId) throw createError(401, "Permission Denied.");

    // find the user
    const user = await User.findById(userId);
    if (!user) throw createError(400, `User(${userId}) not found`);

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
