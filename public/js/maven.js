var Legend = require("chartist-plugin-legend");
var Axistitle = require("chartist-plugin-axistitle");
var Chartist = require("chartist");
var $ = require("jquery");

// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(document).ready(function () {
  var goalId;
  var taskId;
  var editId;
  var stopButtonJustClicked;
  var currentButton;
  var subgId;
  var mainGoalId;
  var timeEachDaySeries;
  var timeOverTimeSeries;
  var chartistSeries;

  // ====================== Sam's Work Station =================// 

  // chartist time each day graph

  var url = window.location.href;
  if (url.includes("second")) {
    goalId = url.slice(url.lastIndexOf('/') + 1);
    new Chartist.Line("#time-each-day", {
      labels: getChartistLabels(goalId),
      series: [
        getTimeEachDaySeries(goalId),
        getTimeOverTimeSeries(goalId)
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 50,
        left: 40
        // top: -10
      },
      // axisY: {
      //   onlyInteger: true
      // },
      // ticks: {
      //   precision: 0
      // },
      plugins: [
        Chartist.plugins.ctAxisTitle({
          axisX: {
            axisTitle: 'Date (YYYYMMDD)',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 30
            },
            textAnchor: 'middle'
          },
          axisY: {
            axisTitle: 'Time (mins)',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 0
            },
            textAnchor: 'middle',
            flipTitle: false
          }
        }),
        Chartist.plugins.legend({
          legendNames: ['Time this day', 'Cumulative Time']
        })
      ]
    });

  }

  // chartist time each day graph
  //   new Chartist.Line("#time-over-time", {
  //     labels: getChartistLabels(goalId),
  //     series: getTimeOverTimeSeries(goalId)
  //   }, {
  //     fullWidth: true,
  //     chartPadding: {
  //       right: 40
  //     }
  //   });
  // }

  function getTimeEachDaySeries(goalId) {
    timeEachDaySeries = $.ajax("/chartist/timeEachDay" + goalId, {
      type: "GET",
      async: false
    })
    chartistData = [];
    unsortedKeysArray = Object.keys(timeEachDaySeries.responseJSON);
    sortedKeysArray = unsortedKeysArray.sort(function (a, b) {
      return a - b
    });
    for (i in sortedKeysArray) {
      thisKey = sortedKeysArray[i];
      chartistData.push(timeEachDaySeries.responseJSON[thisKey])
    }
    console.log(chartistData);
    return chartistData;
  }

  function getTimeOverTimeSeries(goalId) {
    timeOverTimeSeries = $.ajax("/chartist/timeEachDay" + goalId, {
      type: "GET",
      async: false
    })
    chartistData = [];
    unsortedKeysArray = Object.keys(timeOverTimeSeries.responseJSON);
    sortedKeysArray = unsortedKeysArray.sort(function (a, b) {
      return a - b
    });
    for (i = sortedKeysArray.length - 1; i >= 0; i -= 1) {
      thisKey = sortedKeysArray[i];
      thisValue = timeOverTimeSeries.responseJSON[thisKey];
      // console.log("this value: " + thisValue);
      for (j = i - 1; j >= 0; j -= 1) {
        nextKey = sortedKeysArray[j];
        nextValue = timeOverTimeSeries.responseJSON[nextKey];
        // console.log("next value: " + nextValue);
        thisValue = thisValue + nextValue
        // console.log("new this value: " + thisValue);
      }
      chartistData.unshift(thisValue)
    }
    console.log(chartistData)
    return chartistData;
  }

  function getChartistLabels(goalId) {
    dates = $.ajax("/chartist/timeEachDay" + goalId, {
      type: "GET",
      async: false
    })
    chartistData = [];
    unsortedKeysArray = Object.keys(dates.responseJSON);
    sortedKeysArray = unsortedKeysArray.sort(function (a, b) {
      return a - b
    });
    console.log(sortedKeysArray)
    return sortedKeysArray;
  }

  // on click listener for when a start timer button is clicked next to subgoal
  $(".timer-button").on("click", function (event) {
    currentButton = $(this);
    if (currentButton.hasClass("start-timer-button")) {
      // change text in button to say "Stop"
      currentButton.html("Stop")
      console.log(currentButton.html());
      // indicate that this is now a stop button not a start button
      currentButton.removeClass("start-timer-button").addClass("stop-timer-button");
      $.ajax("/api/moment", {
        type: "GET"
      }).then(function (now) {
        // set the startTime attribute of this button equal to the stringyfied moment.js object of the time when this button was click
        currentButton.attr("startTime", JSON.stringify(now));
      })
    } else {
      // change text in button to say "Stop"
      currentButton.html("Start")
      // indicate that this is now a start button not a stop button
      currentButton.removeClass("stop-timer-button").addClass("start-timer-button");
      $.ajax("/api/moment", {
        type: "GET"
      }).then(function (now) {
        // set the stopTime attribute of this button equal to the stringyfied moment.js object of the time when this button was click
        currentButton.attr("stopTime", JSON.stringify(now));
        console.log(currentButton.html());
        stopButtonJustClicked = currentButton;
        console.log(stopButtonJustClicked);
        $(".task-popup").css("display", "flex");
      })
    }
  })

  $(".task-close").on("click", function (event) {
    $(".task-popup").css("display", "none");
    $("#tas-comments").val("");
  })

  $(".submit-task-button").on("click", function (event) {
    $(".task-popup").css("display", "none");
    var newTask = {
      startTime: stopButtonJustClicked.attr("startTime"),
      stopTime: stopButtonJustClicked.attr("stopTime"),
      comments: $("#tas-comments").val().trim(),
      SubgoalId: stopButtonJustClicked.attr("data-reference-subgoal-id")
    }
    $.ajax("/api/tasks", {
      type: "POST",
      data: newTask
    }).then(
      function () {
        $("#tas-comments").val("");
        location.reload();
      }
    )
  })

  // $(".stop-timer-button").on("click", function (event) {
  //   console.log("made it");
  //   $(this).html("Start")
  //   $(this).removeClass("stop-timer-button").addClass("start-timer-button");
  // })

  // on click listeners for controlling the display of the "add new subgoal" pop-up form
  $(".add-subgoal-button").on("click", function (event) {
    goalId = $(this).attr("data-reference-goal-id");
    $(".subgoal-popup").css("display", "flex");
    console.log(goalId);
  })

  $(".submit-subgoal-button").on("click", function (event) {
    $(".subgoal-popup").css("display", "none");
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

  $(".subgoal-close").on("click", function (event) {
    $(".subgoal-popup").css("display", "none");
    $("#new-subgoa").val("");
  })

  // on click listeners for adding a new subgoal to the database from the goal card on the homepage

  // buttons on goal cards for getting to second page
  // html-routes 
  $(".goal-card-button").on("click", function (event) {
    var id = $(this).attr("id");
    goalId = id;
    console.log("gc clicked; id = " + id)
    $.ajax("/second/" + id, {
      type: "GET",
      async: false
    }).then(function (res) {
      console.log("on second page");
      location.assign("/second/" + id);
    })
  })

  $("#addGoal").on("click", function (event) {
    var userId = req.params.id;
    console.log(userId);
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newGoal = {
      name: $("#goa").val().trim(),
      UserId: userId
    };

    // Send the POST request.
    $.ajax("/api/goals", {
      type: "POST",
      data: newGoal
    }).then(
      function () {
        console.log("created a new goal");
        // Reload the page to get the updated list
        // location.reload();
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
    $(".popup-add-new-comment").css("display", "flex");

  })

  // collects info from comment pop up and sends ajax call 
  $(".submit-comment-button").on("click", function (event) {
    $(".popup-add-new-comment").css("display", "flex");
    console.log("pop called");
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
  // $('#demo-carousel').carousel();

  // NEW SUB GOAL BTN
  $(".subclass-btn").on("click", function (event) {
    // mainGoalId = $(this).attr("data-id");
    mainGoalId = event.target.id;
    console.log(mainGoalId);
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    // function createSubGoal () {
    console.log("called");
    var newSubGoal = {
      name: $(".subgoa-name").val().trim(),

      // IMPORTANT !!!!!! 
      //this needs to be edited to grab parent(goal) ID
      GoalId: mainGoalId,
      // IMPORTANT !!!!!!   

    };
    console.log(newSubGoal.name);
    console.log(newSubGoal.GoalId);

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

  // New GOAL BTN
  $(".add-goal-btn").on('click', (event) => {
    userId = event.target.id;
    console.log("userid = " + userId);
    event.preventDefault();
    console.log('add goal called');

    var newGoal = {
      name: $("#goa").val().trim(),
      UserId: userId
    };
    console.log(newGoal);

    $.ajax("/api/goals", {
      type: "POST",
      data: newGoal
    }).then(
      function () {
        console.log("created a new goal");
        $("#goa").val('');
        location.reload();

      });
  });



  // Close Comment Popup
  $(".close").on("click", function (event) {
    $(".popup-add-new-comment").css("display", "none");
    $("#new-comment").val("");
  })

  // Close Edit Subg Popup
  $(".close").on("click", function (event) {
    $(".popup-edit-subgoals").css("display", "none");
    $("#edit-subgoal").val("");
  })


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

  // Delete Subgoal Card
  $('.delete-subgoal').on('click', (event) => {
    console.log('delete subg was clicked!');
    subgId = event.target.id;
    console.log(subgId);
    $.ajax("/api/subgoals/" + subgId, {
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

  // Second Page - Click on Home Btn
  $('.home-btn').on('click', (event) => {
    console.log('home btn clicked!');
    userId = event.target.id;
    $.ajax("/home/" + userId, {
      type: "GET"
    }).then(function (res) {
      console.log("on home page");
      location.assign("/home/" + userId);
    })
  })

  // ============= SIGN UP PAGE =================== // 
  $("#test").on('click', (event) => {
    console.log('hello!');
  })

  $(".test-btn").on('click', (event) => {
    console.log('hi!');
    subgId = event.target.id;
    console.log(subgId);

  })

  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  $("#signup").on("click", function (event) {
    console.log('i was clicked!');
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password) {
    $.post("/api/users", {
        // name: name,
        email: email,
        password: password
      })
      .then(function (data) {
        window.location.replace("/home/" + data.id);
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // ============= END SIGN UP PAGE =================== // 


  // ============= LOGIN UP PAGE =================== // 
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function (event) {
    console.log("test?");
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
        email: email,
        password: password
      })
      .then(function (data) {
        console.log(data.id);
        getHome(data.id);
        // window.location.replace("/home");
        // If there's an error, log the error
      })
    // .catch(function(err) {
    //   console.log(err);
    // });
  }

  // Login call passing param of UserId
  function getHome(userId) {
    $.ajax("/home/" + userId, {
      type: "GET"
    }).then(function (res) {
      console.log("on home page");
      location.assign("/home/" + userId);
    })
  }

  // Logout Btn
  // $(".logout-button").on("click", () => {
  //   $.ajax("/logout", {
  //     type: "GET"
  //   }).then(function (res) {
  //     console.log("on home page");
  //     // location.assign("/logout");
  //   })
  // })

 // Get back to Login
 $(".back-to-login").on("click", () => {
  $.ajax("/login", {
    type: "GET"
  }).then(function (res) {
    console.log("on home page");
    // location.assign("/login");
  })
})

 // Get back to Signup
 $(".to-sign-up").on("click", () => {
  $.ajax("/signup", {
    type: "GET"
  }).then(function (res) {
    console.log("on home page");
    // location.assign("/signup");
  })
})
// ============= END LOGIN UP PAGE =================== // 



// ====================== Joel's Work Station =================// 

// $('.login-button').on('click', (event) => {
//   console.log('login btn clicked!');

//   $.ajax("/", {
//     type: "GET"
//   }).then(function (res) {
//     console.log("on home page");
//     window.location.assign('/login.html');
//   })

// })






// ====================== End Joel's Work Station =================// 
});