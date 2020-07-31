// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

var db = require("../../models");

// Dependencies
var path = require("path");

// Routes
// =============================================================

module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads the main page in index.handlebars
  app.get("/", function (req, res) {

    db.Goals.findAll({
      include: "Subgoals",
      // raw: true,
      where: {
        UserId: 1
      }
    }).then(function (data) {
      console.log(data);
      handleBarsData = {
        Goals: data,
      }
      res.render("index", handleBarsData);
    });
  });

  //  ================ Colin's Work Space ================

  // Second webpage - will we have a second index2.handlebars page?
  // second route loads /second.html or 
  app.get("/second", function (req, res) {
   
  db.Goals.findAll({
    // raw: true,
    where: {
      id: 1
    }
  }).then(function (data) {
    // console.log(data);
    GoalsData = {
      Goals: data,
    }
    findAllSubG(GoalsData, res)
  });
});
    // res.sendFile(path.join(__dirname, "../../second.html"));
    function findAllSubG (GoalsData, res) {
    db.Subgoals.findAll({
      // raw: true,

      where: {
        GoalId: 1,
      },
      include: [
        // {
        //   model: db.Goals, 
        // },
        {
          model: db.Tasks, 
        },
      ]
    }).then(function (data) {
      // console.log(data);
      handleBarsData = {
        Subgoals: data,
      }
  
    //  console.log(GoalsData);
    //  console.log(handleBarsData)
     let combinedData = Object.assign(GoalsData, handleBarsData);
     console.log(combinedData);
      res.render("second", combinedData);
    });

  };
};

// ==========================================
// Test Two!! - Goals (then sub-taks)
// app.get("/second", function (req, res) {
//   console.log("hit route")
//   // res.sendFile(path.join(__dirname, "../../second.html"));
//   db.Goals.findAll({
//     // raw: true,

//     where: {
//       id: 1,
//     },
//     include: [
//       {
//         model: db.Subgoals, 
//       },
//       {
//         model: db.Tasks, 
//       },
//     ]
//   }).then(function (data) {
//     console.log(data);
//     handleBarsData = {
//       Subgoals: data,
//     }
//     res.render("second", handleBarsData);
//   });
// });






  // // blog route loads blog.html
  // app.get("/blog", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // app.get("/authors", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  // });


//   app.get("/second", function (req, res) {
//   db.Goals.findAll({
//     // raw: true,
//     where: {
//       id: 1
//     }
//   }).then(function (data) {
//     console.log(data);
//     handleBarsData = {
//       Goals: data,
//     }
//     res.render("second", handleBarsData);
//   });
// });

  //  ================ Colin's Work Space ================
// };

