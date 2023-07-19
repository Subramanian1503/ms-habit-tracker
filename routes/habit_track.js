const express = require("express");
const habit_track_controller = require("../controller/server/habit_track");

const router = express.Router();

// Configure router URL for server
router.get("/", habit_track_controller.findAllHabitsTrackForToday);
router.get("/update/:id", habit_track_controller.updateTrackStatus);
router.post("/updatev1/:id", habit_track_controller.updateTrackStatusForCalender);
router.get("/history", habit_track_controller.findHabitTracksOfLastSevenDays);
// router.get("/calender/update/:id", habit_track_controller.updateTrackStatusForCalender);

module.exports = router;
