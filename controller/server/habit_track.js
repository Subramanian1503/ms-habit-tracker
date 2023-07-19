const HabitTrack = require("../../model/habit_track");
const Habits = require("../../model/habit");
const { use } = require("passport");

// Controller action used to find all habits in database
module.exports.findHabitsBasedOnStatus = async (request, response) => {
  try {
    // Get required status of the habit from request
    const required_status = request.param.status;
    const current_user = request.user;

    // Query the DB using mongoose
    const habitList = await HabitTrack.find({
      status: required_status,
      user: current_user,
    });
    // Check if the list of habits are available

    // if yes then send data with success code

    const userName = String(current_user.name);

    return response.render("view_habit", {
      habits: habitList,
      user: userName.charAt(0).toUpperCase() + userName.slice(1),
    });
  } catch (error) {
    console.log(`Error occured while trying to create habit in DB: ${error}`);
    return response.redirect("back");
  }
};

module.exports.findAllHabitsTrackForToday = async (request, response) => {
  try {
    // Find whether habits are already created for today
    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const current_user = request.user;
    const habits_for_today = await HabitTrack.find({
      createdAt: {
        $gte: startOfToday,
      },
      user: current_user,
    }).populate("habit");

    const marked_habits = await Habits.find({
      user: current_user
    });

    // If yes, the provide all the habits of today
    if (habits_for_today && habits_for_today.length == marked_habits.length) {
      return response.render("view_habit", {
        habits_track_for_today: habits_for_today,
      });
    } else {
      // If not then create habits for today and render that

      const habits_already_created = habits_for_today.map(
        (habit_track) => habit_track.habit.id
      );

      if (marked_habits) {
        for (
          let habit_index = 0;
          habit_index < marked_habits.length;
          habit_index++
        ) {
          if (!habits_already_created.includes(marked_habits[habit_index].id)) {
            const habit_track = await HabitTrack.create({
              habit: marked_habits[habit_index]._id,
              user: current_user,
            });

            habits_for_today.push(habit_track);
          }
        }
      }

      return response.render("view_habit", {
        habits_track_for_today: habits_for_today,
      });
    }
  } catch (error) {
    console.log(`Error occured while trying to create habit in DB: ${error}`);

    return response.redirect("back");
  }
};

module.exports.updateTrackStatus = async (request, response) => {
  try {
    // Get the status to update from query
    const status_to_update = request.query.update_status;

    // Get the id of the habit track to update as path variable
    const habit_track_id = request.params.id;
    const user = request.user;

    // Get the habit track from DB
    const habit_track_to_update = await HabitTrack.findOne({
      _id: habit_track_id,
      user: user,
    });

    // update the status of the track
    habit_track_to_update.status = status_to_update;

    habit_track_to_update.save();

    // render the view page
    return response.redirect("/habit-track/");
  } catch (error) {
    console.log(
      `Error occured while trying to update habit track in DB: ${error}`
    );

    return response.redirect("back");
  }
};

module.exports.findHabitTracksOfLastSevenDays = async (request, response) => {
  try {
    // find all the habits of the user
    const user = request.user;
    const habits = await Habits.find({user: user});

    const habit_information_list = [];

    // find last seven days activities of that habit
    for (let habit_index = 0; habit_index < habits.length; habit_index++) {
      // Get last seven days tracks of this habit
      let now = new Date();
      let last_seven_days_date = now.getDate() - 7;

      const habit_tracks = await HabitTrack.find({
        habit: habits[habit_index].id,
        createdAt: { $gt: last_seven_days_date },
        user: user,
      }).sort("-createdAt");

      const habit_information = {
        habit: habits[habit_index],
        seven_days_info: habit_tracks,
      };

      habit_information_list.push(habit_information);
    }

    // Get last seven dates
    let dates_list = [];
    let now = new Date();
    for (let index = 0; index < 7; index++) {
      const day = now.getDate() - index;
      const month = now.getMonth();
      const year = now.getFullYear();
      dates_list.push(day + "-" + month + "-" + year);
    }
    
    // render calender page with collected data
    return response.render("calender", {
      habit_information_list: habit_information_list,
      dates_list: dates_list,
    });
  } catch (error) {
    console.log(
      `Error occured while trying to get history information in DB: ${error}`
    );

    return response.redirect("back");
  }
};

module.exports.updateTrackStatusForCalender = async (request, response) => {
  try {
    // Get the status to update from query
    const status_to_update = request.body.update_status;

    // Get the id of the habit track to update as path variable
    const habit_track_id = request.params.id;
    const user = request.user;

    console.log(`${status_to_update}`);
    console.log(`${habit_track_id}`);

    // Get the habit track from DB
    const habit_track_to_update = await HabitTrack.findOne({
      _id: habit_track_id,
      user: user,
    });

    // update the status of the track
    habit_track_to_update.status = status_to_update;
    habit_track_to_update.save();

    // render the view page
    return response.redirect("/habit-track/history");
  } catch (error) {
    console.log(
      `Error occured while trying to update habit track in DB: ${error}`
    );

    return response.redirect("back");
  }
};
