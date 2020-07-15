const mongoose = require("mongoose");

const openProjectSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("OpenProject", openProjectSchema);
