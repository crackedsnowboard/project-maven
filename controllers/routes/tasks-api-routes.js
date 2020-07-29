var db = require("../../models");

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

  app.post("/api/tasks", function(req, res) {
    console.log("post was hit");
    console.log(req.body);
    // Create a Task with the data available to us in req.body
    console.log(req.body);
    db.Tasks.create({    
      "startTime": req.body.startTime,
      "stopTime": req.body.stopTime,
      "comments": req.body.comments,
      "emoji": req.body.emoji,
      "SubgoalId": req.body.SubgoalId,

    }).then(function(dbTasks) {
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
