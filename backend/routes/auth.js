// IMPORTED PACKAGES HERE
const router = require("express").Router();
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");
const uid = require("uid");

// USER MADE MODULES HERE
const User = require("../model/User");
const { getToken, verifyToken, checkDev } = require("../middleware");
const { registerValidation, loginValidation } = require("../utils/validation");
const sendMail = require("../utils/sendMail");
const checkIsEmailValid = require("../utils/checkIsEmailValid");

// ROUTER ENDPOINTS
router.get("/", getUser);
router.post("/register", handleRegistration);
router.post("/login/local", handleLocalLogin);
router.get("/login/github", getToken, handleGithubLogin);
router.get("/profile", getToken, verifyToken, getProfileInfo);
router.post("/verify", getNewVerifyEmail);
router.get("/verify/:token", verifyEmail);
router.get("/password/forgot/:email", sendForgotPasswordEmail);
router.post("/password/forgot/change", handleForgotPasswordUpdate);

// ENDPOINT CONTROLLERS
// accepts a 3 different query fields to search for users
// only returns non-essential data back
async function getUser(req, res, next) {
  try {
    const { email, githubUsername, userId } = req.query;

    if (!email && !githubUsername && !userId) {
      throw createError(400, "You need to add queries to search");
    }

    // check if the userId is a valid format
    if (userId) {
      const isValid = isValidObjectId(userId);
      if (!isValid) throw createError(400, "Invalid userId format");
    }

    // filter down what we should search for
    const searchOp = [{ _id: userId }, { email }, { githubUsername }].filter(
      op => Object.values(op)[0]
    );

    // this takes out the password and send the rest of the user object
    const user = await User.findOne({ $or: searchOp })
      .select({ password: 0, __v: 0, roles: 0 })
      .lean();
    if (!user) throw createError(404, "No user found");

    // send the non-sensitive parts back as this isn't a protected route
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

async function handleRegistration(req, res, next) {
  try {
    //validate before attempting to create
    const { error } = registerValidation(req.body);
    if (error) throw createError(400, error.details[0].message);

    //checking if there are any user in the DB
    const userCount = await User.estimatedDocumentCount();
    if (userCount) {
      //check log if the user is already in the database
      const emailExist = await User.findOne({ email: req.body.email });
      if (emailExist) throw createError(400, "Email already exists");
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a long string to be used to verify user's email
    const emailVerificationCode = uid(36);

    //create the new user
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      //the first user in the DB would be the admin
      roles: [userCount ? "prospect" : "admin"],
      emailVerification: {
        // code is valid for 10 mins
        expiry: Date.now() + 1000 * 60 * 10,
        code: emailVerificationCode,
      },
    });

    // send verifyEmail to user
    await sendMail({
      template: "verifyEmail",
      to: req.body.email,
      subject: "Confirm your email - Chingu",
      ctx: {
        name: req.body.name,
        token: emailVerificationCode,
      },
    });

    res
      .status(200)
      .json({ message: "Please verify your email. Check your inbox." });
  } catch (err) {
    next(err);
  }
}

async function handleLocalLogin(req, res, next) {
  try {
    const { error } = loginValidation(req.body);
    if (error) throw createError(400, error.details[0].message);

    const user = await User.findOne({ email: req.body.email }).lean();
    if (!user) {
      throw createError(400, "An account with that email was not found");
    }

    const isPassValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPassValid) throw createError(400, "Incorrect password");

    // create and assign a token
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
}

async function handleGithubLogin(req, res, next) {
  try {
    // this comes from the getToken middleware
    const githubToken = res.locals.token;

    // https://developer.github.com/v3/users/#get-the-authenticated-user
    const githubUserUrl = "https://api.github.com/user";

    // attach the Github accessToken sent from the frontend
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${githubToken}`,
      },
    };

    // get the authenticated users github profile
    const resp = await fetch(githubUserUrl, fetchOptions);
    if (!resp.ok) throw createError(400, "Github API Error");
    const githubUser = await resp.json();

    // find that Github user's Chingu account
    const chinguUser = await User.findOne({ email: githubUser.email })
      .select({ password: 0, __v: 0 })
      .lean();
    if (!chinguUser) {
      throw createError(
        400,
        "An account was not found with the email that's associated with the provided Github account"
      );
    }

    // since they've already authenticated on Github, we ...
    // ... will consider them authenticated for our site too

    // create and assign a token
    const chinguToken = jwt.sign(
      { userId: chinguUser._id },
      process.env.TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      chingu: {
        token: chinguToken,
        user: chinguUser,
      },
      github: {
        token: githubToken,
        user: githubUser,
      },
    });
  } catch (err) {
    next(err);
  }
}

// returns the user that owns the given jwt token
async function getProfileInfo(req, res, next) {
  try {
    const { userId } = res.locals;

    // this takes out the password and send the rest of the user object
    const user = await User.findById(userId)
      .select({ password: 0, __v: 0 })
      .lean();
    if (!user) throw createError(404, `User(${userId}) not found`);

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

async function getNewVerifyEmail(req, res, next) {
  try {
    const { email } = req.body;

    const validEmailFormat = checkIsEmailValid(email);
    if (!validEmailFormat) throw createError(400, "Invalid email format");

    // find the user with that code
    const user = await User.findOne({ email });
    if (!user) throw createError(404, "No user found");

    // create a long string to be used to verify user's email
    const emailVerificationCode = uid(36);

    // add new emailVerification token and expiry to user
    user.emailVerification = {
      // code is valid for 10 mins
      expiry: Date.now() + 1000 * 60 * 10,
      code: emailVerificationCode,
    };
    await user.save();

    // send verifyEmail to user
    await sendMail({
      template: "verifyEmail",
      to: req.body.email,
      subject: "Confirm your email - Chingu",
      ctx: {
        name: req.body.name,
        token: emailVerificationCode,
      },
    });

    res
      .status(200)
      .json({ message: "Please verify your email. Check your inbox." });
  } catch (err) {
    next(err);
  }
}

async function verifyEmail(req, res, next) {
  try {
    const { token } = req.params;

    // find the user with that code
    const user = await User.findOne({ "emailVerification.code": token });
    if (!user) throw createError(404, "No user found");

    // check if the code is expired
    if (Date.now() > user.emailVerification.expiry) {
      throw createError(400, "Code expired");
    }

    // user found; code is valid; verify email, delete code, and save user
    user.isEmailVerified = true;
    user.emailVerification = undefined;
    await user.save();

    res
      .status(200)
      .json({ message: "Thanks for confirming your email address" });
  } catch (err) {
    next(err);
  }
}

async function sendForgotPasswordEmail(req, res, next) {
  try {
    const { email } = req.params;
    if (!email) throw createError(400, "No email specified");

    const validEmailFormat = checkIsEmailValid(email);
    if (!validEmailFormat) throw createError(400, "Invalid email format");

    const user = await User.findOne({ email });
    if (!user) {
      throw createError(404, "Couldn't find an account with that email.");
    }

    // create a medium string to be used to verify user's email
    const passwordResetCode = uid(20);
    // code is valid for 5 mins
    const passwordRestExpiry = Date.now() + 1000 * 60 * 5;

    // update the user's model
    user.passwordReset.code = passwordResetCode;
    user.passwordReset.expiry = passwordRestExpiry;
    await user.save();

    await sendMail({
      template: "forgotPassword",
      to: email,
      subject: "Forgot Password - Chingu",
      ctx: {
        name: user.name || "",
        token: passwordResetCode,
      },
    });

    res.status(200).json({ message: "Email sent. Check your inbox." });
  } catch (err) {
    next(err);
  }
}

async function handleForgotPasswordUpdate(req, res, next) {
  try {
    const { email, password, code } = req.body;

    if (!email || !password || !code) {
      throw createError(400, "Looks like you left something blank");
    }

    const user = await User.findOne({ email });
    if (!user) throw createError(404, `User(${email}) not found`);

    if (!user.passwordReset.code) {
      throw createError(400, "Please request a code first");
    }

    if (Date.now() > user.passwordReset.expiry) {
      throw createError(400, "Password reset code expired");
    }

    if (user.passwordReset.code !== code) {
      throw createError(400, "Invalid password reset code");
    }

    // everything checks out, so hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // update password and remove passwordReset
    user.password = hashedPassword;
    user.passwordReset = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated" });
  } catch (err) {
    next(err);
  }
}

// TEMPORARY ROUTES
router.get("/all", checkDev, async (req, res, next) => {
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
