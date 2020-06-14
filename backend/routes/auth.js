const router = require("express").Router();
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fetch = require("node-fetch");

const User = require("../model/User");
const { getToken, verifyToken } = require("../middleware");
const { registerValidation, loginValidation } = require("../utils/validation");

// I prefer this way, so you can easily see all ...
// ... all the endpoints and the middlewares used
router.get("/", getUser);
router.post("/register", handleRegistration);
router.post("/login/local", handleLocalLogin);
router.get("/login/github", getToken, handleGithubLogin);
router.get("/profile", getToken, verifyToken, getProfileInfo);

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

// TEMPORARY ROUTES
router.get("/all", async (req, res) => {
  User.find().then(users => res.json(users));
});

// // user pays ,
// router.post('/paid', async (req, res) => {
//   (console.log('paid route'))
// });

// //reset password
// // router.post('/reset', async (req, res) => {
// //     const {error} = loginValidation(req.body);
// //     if (error) return res.status(400).send(error.details[0].message);
// //     const user = await User.findOne({email: req.body.email});
// //     if (!user) return res.status(400).send('User by this email is not found')
// //     // replace password?
// //  });

// // reset password

// app.get('/reset/:token', function(req, res) {
//   User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//       console.log(user);
//     if (!user) {
//       req.flash('error', 'Password reset token is invalid or has expired.');
//       return res.redirect('/forgot');
//     }
//     res.render('reset', {
//      User: req.user
//     });
//   });
// });

// app.post('/reset/:token', function(req, res) {
//   async.waterfall([
//     function(done) {
//       User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user, next) {
//         if (!user) {
//           req.flash('error', 'Password reset token is invalid or has expired.');
//           return res.redirect('back');
//         }

//         user.password = req.body.password;
//         user.resetPasswordToken = undefined;
//         user.resetPasswordExpires = undefined;
//         console.log('password' + user.password  + 'and the user is' + user)

// user.save(function(err) {
//   if (err) {
//       console.log('here')
//        return res.redirect('back');
//   } else {
//       console.log('here2')
//     req.logIn(user, function(err) {
//       done(err, user);
//     });

//   }
//         });
//       });
//     },

//     function(user, done) {
//         // console.log('got this far 4')
//       var smtpTrans = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//           user: 'myemail',
//           pass: 'mypass'
//           // put email and password into here maybe use dotenv for both
//         }
//       });
//       var mailOptions = {
//         to: user.email,
//         from: 'myemail',
//         subject: 'Your password has been changed',
//         text: 'Hello,\n\n' +
//           ' - This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
//       };
//       smtpTrans.sendMail(mailOptions, function(err) {
//         // req.flash('success', 'Success! Your password has been changed.');
//         done(err);
//       });
//     }
//   ], function(err) {
//     res.redirect('/');
//   });
// });

// // forgot password
// app.post('/forgot', function(req, res, next) {
//   async.waterfall([
//     function(done) {
//       crypto.randomBytes(20, function(err, buf) {
//         var token = buf.toString('hex');
//         done(err, token);
//       });
//     },
//     function(token, done) {
//       User.findOne({ email: req.body.email }, function(err, user) {
//         if (!user) {
//         //   console.log('error', 'No account with that email address exists.');
//         req.flash('error', 'No account with that email address exists.');
//           return res.redirect('/forgot');
//         }
// console.log('step 1')
//         user.resetPasswordToken = token;
//         user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//         user.save(function(err) {
//           done(err, token, user);
//         });
//       });
//     },
//     function(token, user, done) {
//         console.log('step 2')

//       var smtpTrans = nodemailer.createTransport({
//          service: 'Gmail',
//          auth: {
//           user: 'myemail',
//           pass: 'mypassword'
//         }
//       });
//       var mailOptions = {

//         to: user.email,
//         from: 'myemail',
//         subject: 'Node.js Password Reset',
//         text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
//           'http://' + req.headers.host + '/reset/' + token + '\n\n' +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n'

//       };
//       console.log('step 3')

//         smtpTrans.sendMail(mailOptions, function(err) {
//         req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
//         console.log('sent')
//         res.redirect('/forgot');
// });
// }
//   ], function(err) {
//     console.log('this err' + ' ' + err)
//     res.redirect('/');
//   });
// });

// app.get('/forgot', function(req, res) {
//   res.render('forgot', {
//     User: req.user
//   });
// });

module.exports = router;
