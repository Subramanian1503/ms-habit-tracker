const express = require("express");
const userController = require("../controller/server/user");
const user_page_render = require("../controller/page_render/user");
const passport = require("passport");

const router = express.Router();

// Defining routes for server URLS
router.post("/create", userController.createUser);
router.get("/signOut", userController.destroySession);

// Defining routes for client URLS
router.get("/signUp", user_page_render.signUp);
router.get("/signIn", user_page_render.signIn);

router.post(
  "/create_session",
  passport.authenticate("local", {
    failureRedirect: "/users/signIn",
  }),
  user_page_render.create_session
);

module.exports = router;
