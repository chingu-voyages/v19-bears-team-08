const mongoose = require("mongoose");

const voyageSchema = new mongoose.Schema({
  version: {
    type: Number,
    required: true,
  },
  dateStart: {
    type: Date,
    required: true,
  },
  dateDue: {
    type: Date,
    // default is 6 weeks later
    // default: this.startDate + 6 weeks ,
    required: true,
  },
  applicants: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      soloProjectUrl: {
        type: String,
      },
      soloProjectIsRequired: {
        type: Boolean,
        default: true,
        required: true,
      },
    },
  ],
  cohorts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cohort",
      required: true,
    },
  ],
});

module.exports = mongoose.model("Voyage", voyageSchema);
