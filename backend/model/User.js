const mongoose = require("mongoose");
const { validationLengths } = require("../utils/validation");

const { name, email, password } = validationLengths;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: name.min,
    max: name.max,
  },
  email: {
    type: String,
    required: true,
    min: email.min,
    max: email.max,
  },
  password: {
    type: String,
    required: true,
    min: password.min,
    max: password.max,
  },
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  // four different types roles [ prospect, member, moderator, admin ]
  roles: {
    type: [String],
    default: ["prospect"],
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
    required: true,
  },
  emailVerification: {
    code: String,
    expiry: Date,
  },
  // if the user is currently on an paid plan
  isActiveMember: {
    type: Boolean,
    default: false,
    required: true,
  },
  githubUsername: {
    type: String,
  },
  hideEmail: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
