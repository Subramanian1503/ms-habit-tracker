const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:atlasadmin123@employee-performance-tr.phxxqrk.mongodb.net/?retryWrites=true&w=majority");

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
