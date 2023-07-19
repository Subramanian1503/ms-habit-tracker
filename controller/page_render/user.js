module.exports.signIn = (request, response) => {
    return response.render("user_sign_in");
}

module.exports.signUp = (request, response) => {
    return response.render("user_sign_up");
}

module.exports.create_session = (request, response) => {
    return response.redirect("/habit-track/");
}