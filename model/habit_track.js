const mongoose = require("mongoose");

const habitTrackSchema = new mongoose.Schema(
  {
    habit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "habit",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    status: {
      type: String,
      enum: ["TO_DO", "DONE", "NOT_FOR_TODAY", "IN_PROGRESS"],
      default: "TO_DO",
    },
  },
  {
    timestamps: true,
  }
);

const HabitTrack = mongoose.model("Habit_track", habitTrackSchema);

module.exports = HabitTrack;
