// Importing the mongoose library to define model
const mongoose = require("mongoose");

// Defining the habit schema with required attributes
const habitSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
    },
    highStreakMaintained: {
      type: Number,
      required: true,
    },
    numberOfConsistentDays: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true
  }
);

// Converting the schema into a model
const habitModel = mongoose.model("habit", habitSchema);

// Exporting the model, So that we can use while requiring it
module.exports = habitModel;
