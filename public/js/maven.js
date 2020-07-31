// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {

  var goalId;
  var taskId;
  var editId;
  var subgId;

  // ====================== Sam's Work Station =================// 

  // on click listeners for controlling the display of the "add new subgoal" pop-up form
  $(".add-subgoal-button").on("click", function (event) {
    goalId = $(this).attr("data-reference-goal-id");
    $(".popup").css("display", "flex");
    console.log(goalId);
  })

  $(".submit-subgoal-button").on("click", function (event) {
    $(".popup").css("display", "none");
    var newSubGoal = {
      name: $("#new-subgoa").val().trim(),
      GoalId: goalId
    }
    $.ajax("/api/subgoals", {
      type: "POST",
      data: newSubGoal
    }).then(
      function () {
        console.log("created a new subgoal with the subgoal popup form");
        $("#new-subgoa").val("");
        location.reload();
      }
    )
  })

  $(".close").on("click", function (event) {
    $(".popup").css("display", "none");
    $("#new-subgoa").val("");
  })

  // on click listeners for adding a new subgoal to the database from the goal card on the homepage

  // buttons on goal cards for getting to second page
  // html-routes 
  $(".goal-card-button").on("click", function (event) {
    $.ajax("/second", {
      type: "GET"
    }).then(function (res) {
      console.log("on second page");
      location.assign("/second");
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

  // For whatever button with class 'subGoal that is clicked 
  // this will respond with the buttons' id
  $(".subGoal").on("click", function (event) {
    console.log("subGoal clicked");
    console.log("id = " + this.id);
    // console.log("data-id = " + $(this.data('id')));
    var id = this.id;
    console.log("if this works, i hate everything " + id);
  })

  // on click listeners for controlling the display of the "add new comment" pop-up form
  $(".add-comment-button").on("click", function (event) {
    SubgoalId = $(this).attr("data-reference-goal-id");
    console.log(SubgoalId);
    $(".popup").css("display", "flex");

  })

  // collects info from comment pop up and sends ajax call 
  $(".submit-comment-button").on("click", function (event) {
    $(".popup").css("display", "none");
    var newComment = {
      startTime: 0,
      stopTime: 0,
      comments: $("#new-comment").val().trim(),
      emoji: 1,
      SubgoalId: SubgoalId,
    }
    $.ajax("/api/tasks", {
      type: "POST",
      data: newComment
    }).then(
      function () {
        console.log("created a new comment with the comment popup form");
        $("#new-comment").val("");
        location.reload();
      }
    )
  })



  // Runs the carousel function - Materialize Method
  $('#demo-carousel').carousel();

  // NEW SUB GOAL BTN
  $(".subclass-btn").on("click", function (event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    // function createSubGoal () {
    console.log("called");
    var newSubGoal = {
      name: $(".subgoa-name").val().trim(),

      // IMPORTANT !!!!!! 
      //this needs to be edited to grab parent(goal) ID
      GoalId: 1,
      // IMPORTANT !!!!!!   

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
        $(".subgoa-name").val("");
        // Reload the page to get the updated list
        location.reload();
        console.log("location reloaded");

      }
    );
  });

  // Task Create function - Currently commented out on second.hbr
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

  // Delete Comment Function 
  $('.delete-comment').on('click', (event) => {
    console.log('delete was clicked!');
    taskId = event.target.id;
    console.log(taskId);
    $.ajax("/api/tasks/" + taskId, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted comment with id", taskId);
        location.reload();
      }
    )
  })


  $('.delete-subgoal').on('click', (event) => {
    console.log('delete subg was clicked!');
    subgId = event.target.id;
    console.log(subgId);
    $.ajax("api/subgoals/" + subgId, {
      type: "DELETE"
    }).then(() => {
      console.log("delete subg with id = ", subgId);
      location.reload();
    })
  });

  // ===== Edit Comment Section ==== // 
  $('.edit-comment').on('click', (event) => {
    console.log('edit comment was clicked!');
    editId = event.target.id;
    console.log(editId);

    // Pop up to edit comments
    $(".popup-edit-comments").css("display", "flex");
  })

  // collects info from comment pop up and sends ajax call 
  $(".edit-comment-button").on("click", function (event) {
    console.log('edit id inside = ' + editId);
    $(".popup").css("display", "none");
    var editedComment = {
      comments: $("#edit-comment").val().trim(),
    }

    $.ajax("/api/tasks/" + editId, {
      type: "PUT",
      data: editedComment
    }).then(
      function () {
        console.log("edited an existing comment with id: " + editId);
        $("#new-comment").val("");
        location.reload();
      })
  })
  // ==== Edit Comment Section ===// 


  // ==== Edit Subgoal Section ===// 
  $(".edit-subgoal").on("click", (event) => {
    console.log('edit Subg was clicked!');
    subgId = event.target.id;
    console.log(subgId);

    // Pop up to edit subgoal
    $(".popup-edit-subgoals").css("display", "flex");
  })

  // collects info to update Subgoal
  $(".edit-subgoal-button").on('click', (event) => {
    console.log('edit subgoal with id = ' + subgId);
    $('.popup').css("display", "none");
    var editedSubgoal = {
      name: $("#edit-subgoal").val().trim(),
    }
    console.log(editedSubgoal);

    $.ajax("/api/subgoals/" + subgId, {
      type: "PUT",
      data: editedSubgoal
    }).then(
      function () {
        console.log("edited an existing Subgoal with id: " + subgId);
        $("#edit-subgoal").val("");
        location.reload();

      })
  })

});