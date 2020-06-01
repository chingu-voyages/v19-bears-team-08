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
  date: {
    type: Date,
    default: Date.now,
  },
  roles: [
    {
      // four different types roles [ prospect, member, moderator, admin ]
      type: String,
      default: "prospect",
    },
  ],
  // if the user is currently on an paid plan
  activeMember: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
