const express = require("express");
const habit_controller = require("../controller/server/habit");

const router = express.Router();

router.post("/create", habit_controller.create);

module.exports = router;