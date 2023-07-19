const User = require("../../model/user");

// Logging out from the session
module.exports.destroySession = (request, response) => {
  request.logout((error) => {
  });

  return response.redirect("/");
};

// Method to create a new user
module.exports.createUser = async (request, response) => {

  // Validate the user inputs
  const validationResponse = validateCreateUserRequest(request);

  if (validationResponse == "REQUEST_VALID") {
    try {
      // If request is valid then create a user
      const createdUser = await User.create(request.body);

      // redirecting with the view page and collected data from DB
      return response.redirect("/habit-track/");
    } catch (error) {
      return response.redirect("back");
    }
  } else {
    // Adding the success message to the request to show as a flash message
    console.log(
      `Error occured while trying to signUp user with error message: ${validationResponse}`
    );
    return response.redirect("back");
  }
};

function validateCreateUserRequest(request) {
  // Validate whether the provided password and confirm password is valid
  if (request.body.password != request.body.confirm_password) {
    return "password and confirm password not matching with each other";
  }

  // Check if the user already exists
  let errorMessage = "";
  User.findOne({ email: request.body.email })
    .then((user) => {
      if (user) {
        errorMessage = `User already exists ${user}`;
      }
    })
    .catch((error) => {
      errorMessage = `Error occured while trying to fetch user from DB: ${error}`;
    });
  if (errorMessage) {
    return errorMessage;
  }

  return "REQUEST_VALID";
}
