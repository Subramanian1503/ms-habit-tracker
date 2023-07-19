$(document).ready(function () {
  // Make change form action and display property for editable status of habit
  $(".editIcon").click((event) => {
    console.log(event);
    const habit_track_id = event.currentTarget.getAttribute("data-habit_track-id");
    $("#edit_habit-track_status_container").css("display", "block");
    $("#edit_habit-track_status_form").attr("action", "/habit-track/updatev1/" + habit_track_id);
  });

  $("#edit_habit_header p").click(() => {
    $("#edit_habit-track_status_container").css("display","none");
  });
});
