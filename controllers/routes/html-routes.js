// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

var db = require("../../models");

// Dependencies
var path = require("path");

// Global Vars
var id;

// Routes
// =============================================================

module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads the main page in index.handlebars
  // app.get("/home", function (req, res) {

  //   db.Goals.findAll({
  //     include: "Subgoals",
  //     // raw: true,
  //     where: {
  //       UserId: 1
  //     }
  //   }).then(function (data) {
  //     console.log(data);
  //     handleBarsData = {
  //       Goals: data,
  //     }
  //     res.render("index", handleBarsData);
  //   });
  // });



  //  ================ Colin's Work Space ================

  function findAllUsers() {
    console.log("find all users called");
    db.Users.findAll({
      where: {
        UserId: id
      }
    })

  }

  // Second webpage - will we have a second index2.handlebars page?
  // second route loads /second.html or 
  app.get("/second/:id", function (req, res) {
    id = req.params.id;
    console.log(id);
    db.Goals.findAll({
      // raw: true,
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      // console.log(data);
      GoalsData = {
        Goals: data,
      }
      findAllSubG(GoalsData, id, res)
    });
  });
  // res.sendFile(path.join(__dirname, "../../second.html"));
  function findAllSubG(GoalsData, id, res) {
    console.log("findAllSubG's called");
    db.Subgoals.findAll({
      // raw: true,

      where: {
        GoalId: id,
      },
      include: [
        {
          model: db.Tasks,
        },
      ]
    }).then(function (data) {
      // console.log(data);
      handleBarsData = {
        Subgoals: data,
      }
      findAllUsersSecond(GoalsData, handleBarsData, id, res)
      // let combinedData = Object.assign(GoalsData, handleBarsData);
      // console.log(combinedData);
      // res.render("second", combinedData);
    });

    function findAllUsersSecond(GoalsData, handleBarsData, id, res) {
      console.log("find all second called");
      db.Users.findAll({
        where: {
        id: id,
        }
      }).then(function (data) {
        usersData = {
          Users: data,
        }

        let combinedData = Object.assign(GoalsData, handleBarsData, usersData);
        console.log(combinedData);
        res.render("second", combinedData);
      })
    }

  };

  // HOME - Individualized by ID
  app.get("/home/:id", function (req, res) {
    var paramId = req.params.id;
    db.Goals.findAll({
      include: "Subgoals",
      // raw: true,
      where: {
        UserId: paramId
      }
    }).then(function (data) {
      console.log(data);
      UserData = {
        Goals: data,
      }
      findAllUsers(UserData, paramId, res)
      // res.render("index", handleBarsData);
    });
  });

  function findAllUsers(UserData, goalId, res) {
    console.log("find all users called");
    db.Users.findAll({
      where: {
        id: goalId
      }
    }).then(function (data) {
      handleBarsData = {
        Users: data,
      }

      let combinedData = Object.assign(UserData, handleBarsData);
      console.log(combinedData);
      res.render("index", combinedData)
    })

  }

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