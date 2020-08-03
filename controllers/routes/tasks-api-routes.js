var db = require("../../models");
const moment = require("moment");

module.exports = function(app) {
  // Find all Tasks and return them to the user with res.json
  app.get("/api/tasks", function(req, res) {
    db.Tasks.findAll({}).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  app.get("/api/tasks/:id", function(req, res) {
    // Find one Tasks with the id in req.params.id and return them to the user with res.json
    db.Tasks.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  // returns a moment.js object
  // if a time is passed in via req.timeString, return the moment.js object at that time
  // otherwise, return the momenth.js object at the time that the request was made
  app.get("/api/moment", function(req, res) {
    if (req.timeString) {
      res.json(moment(req.timeString));
    } else {
      res.json(moment());
    }
  })

  app.post("/api/tasks", function(req, res) {
    console.log("post was hit");
    console.log(req.body);
    // Create a Task with the data available to us in req.body
    console.log(req.body);
    db.Tasks.create({    
      "startTime": req.body.startTime,
      "stopTime": req.body.stopTime,
      "comments": req.body.comments,
      "SubgoalId": req.body.SubgoalId
    }).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  // Update Task - Comments
  app.put("/api/tasks/:id", function(req, res) {
    console.log("post was hit");
    console.log(req.body);
    console.log("req id = " + req.params.id);
    // Edit a Task with the data available to us in req.body
    console.log(req.body);
    db.Tasks.update(
      {   "comments": req.body.comments },
      {  where: { id: req.params.id} }

        ).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

  app.delete("/api/tasks/:id", function(req, res) {
    // Delete the Tasks with the id available to us in req.params.id
    db.Tasks.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTasks) {
      res.json(dbTasks);
    });
  });

};
