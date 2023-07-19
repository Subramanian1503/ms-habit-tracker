const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/habit_tracker_db");

let databaseConnection = mongoose.connection;

databaseConnection.on(
  "error",
  console.error.bind(
    console,
    "Error occured while trying to connect with database"
  )
);

databaseConnection.once("open", () => {
  console.log("Connection with database was established successfully");
});
