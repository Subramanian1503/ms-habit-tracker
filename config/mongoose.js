const mongoose = require("mongoose");
const envConfig = require("dotenv").config();

mongoose.connect("mongodb+srv://admin:atlasadmin123@habit-tracker-cluster-1.s5lubel.mongodb.net/?retryWrites=true&w=majority");

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
