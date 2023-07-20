const mongoose = require("mongoose");
const envConfig = require("dotenv").config();

mongoose.connect(process.env.MONGO_DB_CONNECT);

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
