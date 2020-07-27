// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  
    $(".goal-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newGoal = {
        goalName: $("#goa").val().trim(),
      };
  
      // Send the POST request.
      $.ajax("/api/goals", {
        type: "POST",
        data: newGoal
      }).then(
        function() {
          console.log("created a new goal");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".subgoal-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        var newSubGoal = {
          subGoalName: $("#subgoa-name").val().trim(),
          referenceGoalID: $("#subgoa-id").val().trim()
        };
    
        // Send the POST request.
        $.ajax("/api/subgoals", {
          type: "POST",
          data: newSubGoal
        }).then(
          function() {
            console.log("created a new sub goal");
            // Reload the page to get the updated list
            location.reload();
          }
        );
      });
  });