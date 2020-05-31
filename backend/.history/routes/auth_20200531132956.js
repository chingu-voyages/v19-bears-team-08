const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../utils/validation");

router.get("/", (req, res) => res.send("auth endpoints"));
// register // public route
router.post("/register", async (req, res) => {
  console.log(req.body);
  //LETS VALIDATE THE DATA BEFORE WE ADD A User
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check log if the user is already in the database
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
    res.json(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// login // public route
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email or Password is Wrong");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Email or Password is Wrong");

  // create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json(token);
  // verify it is you, sends back jwt token and userObject 
});

// User (returns the user searched for) // logged in users only route
router.post("/user", async (req, res) => {
  console.log(req.body);

  // verifyToken.js
// auth()


 //check log if the user is in the database
 const userExists = await User.findOne({ name: req.body.name });
 if (!userExists) {
  return res.status(400).send("Cannot find user");
 } else  {
   console.log(userExists)
   if (res.header === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWQzMmI0MTdmMDdhZDQ0NjQ4NjNjZTIiLCJpYXQiOjE1OTA4OTc4Mzh9.EpMZ8IKvUn3DvIGLq9mPIefaBCzdyPYTTsGX-zSrlKk") {
    res.json(userExists);
   } else {
   userExists.email = "****@smith.com"
   userExists.password = "*****"
  // send back user data 
    res.json(userExists);
  }

   
}});

// Dashboard, area you go to once logged in ? // logged in users only !
router.post("/dashboard", async (req, res) => {
  console.log(req.body);
  console.log("user is logged in - Dash") 
  res.json("Dashboard Page")
});

// Admin only route (should be logged in and admin)
router.post("/admin", async (req, res) => {
  console.log(req.body);
  if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
}
});

module.exports = router;
