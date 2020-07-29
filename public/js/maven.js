// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {

  // buttons on goal cards for getting to second page
  // html-routes 
  $(".goal-card-button").on("click", function (event) {
    $.ajax("/second", {
      type: "GET"
    }).then(function (res) {
      console.log("on second page");
    })
  })

  $(".goal-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newGoal = {
      name: $("#goa").val().trim(),
      UserId: 1
    };

    // Send the POST request.
    $.ajax("/api/goals", {
      type: "POST",
      data: newGoal
    }).then(
      function () {
        console.log("created a new goal");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

  // $(".subgoal-form").on("submit", function (event) {
  //   // Make sure to preventDefault on a submit event.
  //   event.preventDefault();

  //   var newSubGoal = {
  //     name: $("#subgoa-name").val().trim(),
  //     GoalId: $(this).data('id'),
  //   };

  //   // Send the POST request.
  //   $.ajax("/api/subgoals", {
  //     type: "POST",
  //     data: newSubGoal
  //   }).then(
  //     function () {
  //       console.log("created a new sub goal");
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });

  $(".user-form").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newUser = {
      name: $("#use-name").val().trim(),
      username: $("#use-username").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/users", {
      type: "POST",
      data: newUser
    }).then(
      function () {
        console.log("created a new user");
        // Reload the page to get the updated list
        // location.reload();
      }
    );
  });


  // ====================== Colin's Work Station =================// 

  // For whatever button that is clicked, this will respond with the buttons' id
  $(".subGoal").on("click", function (event) {
    console.log("subGoal clicked");
    console.log("id = " + this.id);
    // console.log("data-id = " + $(this.data('id')));

    var id = this.id;
    console.log("if this works, i hate everything " + id);
  })


  // Runs the carousel function - Materialize Method
  $('#demo-carousel').carousel();

  // =========


  $(".subclass-btn").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    // function createSubGoal () {
    console.log("called");
    var newSubGoal = {
      name: $(".subgoa-name").val().trim(),
      //this needs to be edited to grab parent(goal) ID
      GoalId: 1,

    };
    console.log(newSubGoal.name);
    console.log(newSubGoal.GoalId);

    // Send the POST request.
    $.ajax("/api/subgoals", {
      type: "POST",
      data: newSubGoal
    }).then(
      function () {
        console.log("created a new sub goal");
        // Reload the page to get the updated list
        // location.reload();

      }
    );
  });

  $('.task-submit').on('click', (event) => {
    console.log("submit was clicked");
    event.preventDefault();
    // ALL of this will need to be updated !! 
    var newTask = {
      startTime: 10,
      stopTime: 20,
      comments: $('.comments').val().trim(),
      emoji: 1,
      SubgoalId: 15,
    };

    $.ajax("/api/tasks", {
      type: "POST",
      data: newTask
    }).then(
      function () {
        console.log("created a new task");
        // Reload the page to get the updated list
        // location.reload();
      }
    );
  });

  // ======================  =================// 

});