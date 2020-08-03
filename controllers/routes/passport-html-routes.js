// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    // IF NOT A USER 
    // Send to login page
    // res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("login");
  });

  app.get("/signup", function(req, res) {
    // If the user logged in send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    // IF USER FAILED TO LOG IN
    // res.sendFile(path.join(__dirname, "../public/login.html"));
    res.render("signup");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/home", isAuthenticated, function(req, res) {
  //   res.redirect("/home");
  // });

};
