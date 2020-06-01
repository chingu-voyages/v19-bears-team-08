const router = require("express").Router();
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const verifyToken = require("../middleware/verifyToken");
const { registerValidation, loginValidation } = require("../utils/validation");

// I prefer this way, so you can easily see all the ...
// ... endpoints and the middlewares used
// TEMPORARY ROUTE
router.get("/all", async (req, res) => {
  User.find().then(users => res.json(users));
});
router.post("/register", handleRegistration);
router.post("/login", handleLogin);
router.get("/profile", verifyToken, getProfileInfo);
// router.post("/admin", getAdmin);
// router.post("/dashboard", getUser);

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

async function handleLogin(req, res, next) {
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

// // Admin only route (should be logged in and admin)
// async function getAdmin(req, res, next) {
//   console.log(req.body);
//   if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// }

// // Dashboard, area you go to once logged in ? // logged in users only !
// async function getDashboard(req, res, next) {
//   console.log(req.body);
//   let token = req.headers.authorization; // Express headers are auto converted to lowercase
//   token = token.slice(7, token.length);
//   // str = str.slice(0, -1);
//   // str = str.slice(1)
//   token = token.slice(0, -1);
//   token = token.slice(1);
//   //console.log(token);
//   if (!token) return res.status(401).send("Access Denied");
//   try {
//     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
//     console.log(verified + "User is logged in");
//     return res.json("Dashboard Page");
//     //req.user = verified;
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// }

module.exports = router;
