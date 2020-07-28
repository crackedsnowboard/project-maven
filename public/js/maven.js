// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function() {
  
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



// ======================  =================// 

});