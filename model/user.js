// Requiring mongoose to create a model
const mongoose = require("mongoose");

const path = require("path");

// Defining the schema from mongoose and define its attributes
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      require: true,
    },
    habits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
      },
    ],
  },
  {
    timeStamp: true,
  }
);

// 03 => Converting a schema into a model by provide the collection name for the defined schema
const User = mongoose.model("User", userSchema);

// 04 => Export the model
module.exports = User;
