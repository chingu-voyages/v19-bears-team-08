const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../utils/validation");

router.get("/", (req, res) => res.send("auth endpoints"));

router.post("/register", async (req, res) => {
  console.log(req.body);
  //LETS VALIDATE THE DATA BEFORE WE ADD A User
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checklog if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password is Wrong");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or Password is Wrong");

  // create and asign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

// User (returns the user object)
router.post("/user", async (req, res) => {
  console.log(req.body);
  //LETS VALIDATE THE DATA BEFORE WE ADD A User
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checklog if the user is already in the database
  const userExists = await User.findOne({ name: req.body.name });
  if (!userExists) return res.status(400).send("Cannot find user");

});


module.exports = router;
