const mongoose = require("mongoose");

const openProjectSchema = new mongoose.Schema({
  repoName: {
    type: String,
    required: true,
  },
  repoOwnerName: {
    type: String,
    required: true,
  },
  chinguOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("OpenProject", openProjectSchema);
