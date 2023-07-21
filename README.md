# ms-habit-tracker
Habit tracker application implemented using Node JS and EJS. This application can be used to track habits of a user

Here we implemented 4 main view pages using EJS
* User sign in page
* User sign up page
* Habit today track view
* Habit track view for past six days inclusing today

The user can use this application by following these steps
* Create a new user using sign up page
* Sign in the user using created user information
* View page will be displayed, On top right we can see a + button, which helps us to create a new habit to track for every day
* The created habits will be tracked for today.
* Calender view page will display the user about the habit track informations for the past 7 days inclusing today.

  The project structure consists of
  * assets(contains required css files)
  * config(contains required mongoose and passport setup files)
  * controller(contains required controller actions for the views)
  * model(contains the models used for the application)
  * routes(contains the routes required)
  * views(contains the view pages involved in the application implemented using EJS)
  * .env(containes secrets)
  * index.js(entry point of the application)
