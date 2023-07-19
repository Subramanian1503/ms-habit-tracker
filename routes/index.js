// Importing the express library to define routes
const express = require("express");
const view_page_render = require("../controller/page_render/view_page");
const user_page_render = require("../controller/page_render/user");
const calender_page_render = require("../controller/page_render/calender_page");
const user_router = require("./user");
const passport = require("passport");
const habit_track_router = require("./habit_track");
const habit_router = require("./habit");

// Getting the required router from express library
const router = express.Router();

// Defining route for client URLS
router.get("/", passport.checkAuthentication, view_page_render.view_page);
router.get(
  "/calender",
  passport.checkAuthentication,
  calender_page_render.calender_view
);
router.get(
  "/add_habits",
  passport.checkAuthentication,
  view_page_render.create_habit
);

// Defining middle ware for client URLS
router.use("/users", user_router);

// Defining routes for server URLS
router.use("/habit-track", habit_track_router);
router.use("/habit", habit_router);

// Defining middle ware for server URLS

// Exporting the router defined to be used in the application
module.exports = router;
