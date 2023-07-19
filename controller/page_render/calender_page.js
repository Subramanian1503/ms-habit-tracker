module.exports.calender_view = (request, response) => {
  try {
    // Redirect the view
    return response.redirect("/habit-track/history");
  } catch (error) {
    console.log(`Error occured while trying to render home page: ${error}`);
    return response.redirect("back");
  }
};
