var express = require("express");
var sequelize = require("sequelize");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");
console.log(db);

// console.log(db.SubGoals.findAll().then(function(data){console.log(data)}));
// Create all our routes and set up logic within those routes where required.

// (for testing purposes) get all goals and subgoals
router.get("/", function (req, res) {
    db.Goals.findAll().then(function (data) {
        var goals = data;
        db.Subgoals.findAll().then(function (data) {
            var allGoalsAndSubgoals = {
                goals: goals,
                subGoals: data
            };
            res.render("index", allGoalsAndSubgoals);
        })
    });
});

// (for testing purposes) add a new goal
router.post("/api/goals", function (req, res) {
    db.Goals.create({"goalName": req.body.goalName})
    .then(function(result) {
        res.json({ id: result.insertID });
    })
});

// (for testing purposes) add a new sub goal
router.post("/api/subgoals", function (req, res) {
    db.Subgoals.create({
        "name": req.body.name,
        "GoalId": req.body.GoalId
    })
    .then(function(result) {
        res.json({ id: result.insertID });
    })
});

// (for testing purposes) commented out for now, just testing add and get capabilities
// router.put("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   cat.update(
//     {
//       sleepy: req.body.sleepy
//     },
//     condition,
//     function(result) {
//       if (result.changedRows === 0) {
//         // If no rows were changed, then the ID must not exist, so 404
//         return res.status(404).end();
//       }
//       res.status(200).end();

//     }
//   );
// });

// Export routes for server.js to use.
module.exports = router;
