const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema({
  members: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  team: {
    type: Number,
  },
});

module.exports = mongoose.model("Cohort", cohortSchema);
