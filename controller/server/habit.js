const Habit = require("../../model/habit");

// Controller action used to create a habit in database
module.exports.create = async (request, response) => {
  try {
    // Getting the required information from request body
    const { name, avatar } = request.body;

    // Validate the request

    // Execute create habit using habit model
    const createdHabit = await Habit.create({
      name: name,
      avatar: avatar,
      favourite: false,
      highStreakMaintained: 0,
      numberOfConsistentDays: 0,
      user: request.user,
    });

    // Send successfull response
    return response.redirect("/habit-track/")
  } catch (error) {
    console.log(`Error occured while trying to create habit in DB: ${error}`);
    return response.redirect("back");
  }
};

// Controller action used to update the habit

// Controller action used to find a habit by name in database

// Controller action used to delete a habit by name in database
