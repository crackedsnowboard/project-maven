var db = require("../../models");

module.exports = function(app) {
  // Find all Goals and return them to the user with res.json
  app.get("/api/goals", function(req, res) {
    db.Goals.findAll({}).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  app.get("/api/goals/:id", function(req, res) {
    // Find one Goal with the id in req.params.id and return them to the user with res.json
    db.Goals.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  app.post("/api/goals", function(req, res) {
    // Create an Goal with the data available to us in req.body
    console.log(req.body);
    db.Goals.create(req.body).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  app.put("/api/goals", function(req, res) {
      db.Goals.update(req.body,
        {
            where: {
                id: req.body.id
            }
        }).then(function(dbGoals) {
            res.json(dbGoals);
        });
  });

  app.delete("/api/goals/:id", function(req, res) {
    // Delete the Goal with the id available to us in req.params.id
    db.Goals.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

};
