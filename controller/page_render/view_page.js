module.exports.view_page = async (request, response) => {
  try {
    // Get the current user
    const user = request.user;

    // Redirect the view
    return response.redirect("/habit-track/");
  } catch (error) {
    console.log(`Error occured while trying to render home page: ${error}`);
    return response.redirect("back");
  }
};

module.exports.create_habit = async (request, response) => {
  try {
    // Get the current user
    const user = request.user;

    // Redirect the view
    return response.render("_create_habit");
  } catch (error) {
    console.log(`Error occured while trying to render home page: ${error}`);
    return response.redirect("back");
  }
};
