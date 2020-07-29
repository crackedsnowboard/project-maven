var db = require("../../models");

module.exports = function(app) {
  // Find all Users and return them to the user with res.json
  app.get("/api/goals", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Find one User with the id in req.params.id and return them to the user with res.json
    db.Users.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/users", function(req, res) {
    // Create an User with the data available to us in req.body
    // console.log(req.body);
    db.Users.create({
      "name": req.body.name,
      "username": req.body.username
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.put("/api/tasks", function(req, res) {
    db.Users.update(req.body,
      {
          where: {
              id: req.body.id
          }
      }).then(function(dbUsers) {
          res.json(dbUsers);
      });
});

  app.delete("/api/users/:id", function(req, res) {
    // Delete the User with the id available to us in req.params.id
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

};
