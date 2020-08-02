// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
// var firebase = require("firebase/app");

// Add the Firebase products that you want to use
// require("firebase/auth");
// require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
// var firebaseConfig = {
//   apiKey: "AIzaSyCg3wQo8J8Ecm9NU1ys1mawP7LRnQ04FiU",
//   authDomain: "maven-61156.firebaseapp.com",
//   databaseURL: "https://maven-61156.firebaseio.com",
//   projectId: "maven-61156",
//   storageBucket: "maven-61156.appspot.com",
//   messagingSenderId: "521757513471",
//   appId: "1:521757513471:web:d8affcc6917e61ee275eca",
//   measurementId: "G-PZBT37J4TM"
// };

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

var db = require("../../models");

module.exports = function (app) {
  // Find all Users and return them to the user with res.json
  app.get("/api/goals", function (req, res) {
    db.Users.findAll({}).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/api/users/:id", function (req, res) {
    // Find one User with the id in req.params.id and return them to the user with res.json
    db.Users.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  app.post("/api/users", function (req, res) {
    // Create an User with the data available to us in req.body
    // console.log(req.body);
    db.Users.create({
      "name": req.body.name,
      "email": req.body.email,
      "password": req.body.password
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

  app.put("/api/tasks", function (req, res) {
    db.Users.update(req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbUsers) {
        res.json(dbUsers);
      });
  });

  app.delete("/api/users/:id", function (req, res) {
    // Delete the User with the id available to us in req.params.id
    db.Users.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbUsers) {
      res.json(dbUsers);
    });
  });

};
