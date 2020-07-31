var db = require("../../models");

module.exports = function(app) {
  // Find all subgoals and return them to the user with res.json
  app.get("/api/subgoals", function(req, res) {
    db.Subgoals.findAll({}).then(function(dbSubgoals) {
      res.json(dbSubgoals);
    });
  });

  app.get("/api/subgoals/:id", function(req, res) {
    // Find one subgoal with the id in req.params.id and return them to the user with res.json
    db.Subgoals.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbSubgoals) {
      res.json(dbSubgoals);
    });
  });


  app.post("/api/subgoals", function(req, res) {
    // Create an Subgoal with the data available to us in req.body
    console.log(req.body);
    db.Subgoals.create(req.body).then(function(dbSubgoals) {
      res.json(dbSubgoals);
    });
  });

 // ====== Update Subgoal
  app.put("/api/subgoals/:id", function(req, res) {
    console.log('post was hit');
    console.log(req.body.name);
    console.log("req id = " + req.params.id);
    //Edit a Subgoal with the data in req.body
    db.Subgoals.update(
      { "name": req.body.name},
      { where: { id: req.params.id} }

    ).then(function(dbSubgoals) {
          res.json(dbSubgoals);
      });
});


// ======= Delete Card / Subgoal
  app.delete("/api/subgoals/:id", function(req, res) {
    // Delete the Subgoal with the id available to us in req.params.id
    db.Subgoals.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbSubgoals) {
      res.json(dbSubgoals);
    });
  });

};
