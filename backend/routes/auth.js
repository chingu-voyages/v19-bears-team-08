const router = require("express").Router();
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");

const User = require("../model/User");
const { getToken, verifyToken } = require("../middleware");
const { registerValidation, loginValidation } = require("../utils/validation");

// I prefer this way, so you can easily see all ...
// ... all the endpoints and the middlewares used
router.post("/register", handleRegistration);
router.post("/login/local", handleLocalLogin);
router.post("/login/github", getToken, handleGithubLogin);
router.get("/profile", getToken, verifyToken, getProfileInfo);

async function handleRegistration(req, res, next) {
  try {
    //validate before attempting to create
    const { error } = registerValidation(req.body);
    if (error) throw createError(400, error.details[0].message);

    //check log if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) throw createError(400, "Email already exists");

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create the new user
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    //create jwt token
    const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
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
    // https://developer.github.com/v3/users/#get-the-authenticated-user
    const githubUserUrl = "https://api.github.com/user";
    const githubToken = res.locals.token;
    // attach the Github accessToken sent from the frontend
    const fetchOptions = { Authorization: `Bearer ${githubToken}` };

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

    const user = {
      ...githubUser,
      ...chinguUser,
    };

    res.status(200).json({ githubToken, chinguToken, user });
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

// TEMPORARY ROUTES
router.get("/all", async (req, res) => {
  User.find().then(users => res.json(users));
});

module.exports = router;
