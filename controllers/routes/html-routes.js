// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

var db = require("../../models");

// Dependencies
var path = require("path");

// Routes
// =============================================================

module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function (req, res) {
    // below is a reference, making 

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


  // Second webpage - will we have a second index2.handlebars page?
  // second route loads /second.html or 
  app.get("/second", function (req, res) {
    res.sendFile(path.join(__dirname, "../../views/second.handlebars"));
  });

  // // blog route loads blog.html
  // app.get("/blog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // app.get("/authors", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });

};

