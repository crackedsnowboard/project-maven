var db = require("../models");

module.exports = function(app) {
  // Find all Goals and return them to the user with res.json
  app.get("/api/goals", function(req, res) {
    db.Goals.findAll({}).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  app.get("/api/authors/:id", function(req, res) {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    db.Goals.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  app.post("/api/authors", function(req, res) {
    // Create an Author with the data available to us in req.body
    console.log(req.body);
    db.Goals.create(req.body).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

  app.delete("/api/authors/:id", function(req, res) {
    // Delete the Author with the id available to us in req.params.id
    db.Goals.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGoals) {
      res.json(dbGoals);
    });
  });

};
