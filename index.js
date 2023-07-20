// Importing the express library to initialise and define the application
const express = require("express");

// Initialsing the config
const databaseConfig = require("./config/mongoose");
const passport_local = require("./config/passport-local");
const passport = require("passport");
const express_session = require("express-session");
const MongoStore = require("connect-mongo");

// Initialzing the dot env config
const environmentalVariableConfig = require("dotenv").config();

// Getting the application from the imported express library
const application = express();

// Port using which client communicates to the server
const SERVICE_PORT = 8080;

const expressLayout = require("express-ejs-layouts");

const fileUpload = require("express-fileupload");
application.use(fileUpload());

// Initialising the layout for ejs
application.use(expressLayout);

// Setting up the static file directory
application.use(express.static("./assets"));

// Setup view engine and views folder
application.set("view engine", "ejs");
application.set("views", "./views");

// Setting up the request parser for express
application.use(express.urlencoded());
application.use(express.json());

// Initialise and configure express-session as middleware to handle session cookie creation with properties
application.use(
  express_session({
    name: "habit_tracker",
    // TODO: need to change this while deployment
    secret: "SomeSecretInformation",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 10 * 60 * 60 * 1000,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/users_session_db",
    }),
  })
);

// Initialise passport to handle authentication and trigger express-session to create session
application.use(passport.initialize());
application.use(passport.session());

// Use middleware to set authentication user information in the response so that views can use that
application.use(passport.setAuthenticatedUser);

// Importing the main router in the main class to make the server know the defined router
const mainRouter = require("./routes");

// Defining the middle ware to use the defined router in the application
application.use("/", mainRouter);

// Setting a middleware to redirect to the local upload folder for image search
application.use("/upload", express.static(__dirname + "/upload"));

// Defining the application to listent to the defined port
application.listen(SERVICE_PORT, (error) => {
  if (error) {
    console.log(`Error occurred while trying to start server: ${error}`);
    return;
  }
  console.log(`Habit tracker server started successfully`);
});
