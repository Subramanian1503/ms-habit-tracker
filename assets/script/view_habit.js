$(document).ready(function(){

  $("#add_habit_link").click((event) => {
    event.preventDefault();
    $("#add_habit_modal").css("display","block");
    $(".dropdown").css("display", "none");
  });

  $(".create_habit_subheading p").click(() => {
    $("#add_habit_modal").css("display","none");
    $(".dropdown").css("display", "inline-block");
  });

  
});
