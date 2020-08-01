// Dependencies
// =============================================================
var express = require("express");
// var session = require("express-session");
// var passport = require("./config/passport");
var fs = require("fs");


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("public"));

// ======================== Joel's work area =========================

// !!!! IMPORTANT this extra var app was causing rendering issues !!!! // 
// var app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// We need to use sessions to keep track of our user's login status
// app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
// app.use(passport.initialize());
// app.use(passport.session());

// ======================== End Joel's work area =========================


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main" }));
app.set("view engine", "handlebars");
// app.set("view options", {layout: "second"});


// ======================== Joel's work area =========================

// middleware for logging api methods on routes. For testing purposes can delete before final deployment through line 37.
// app.use((req, res, next) => {
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`;
//   console.log(log);
//   fs.appendFile('server.log', log + '\n', (err) => {
//     if(err) {
//       console.log('unable to append to server.log');
//     }
//   });
//   next();
// });

// Import routes and give the server access to them.
// var routes = require("./controllers/mavenController.js");
require("./controllers/routes/html-routes.js")(app);
require("./controllers/routes/goals-api-routes.js")(app);
require("./controllers/routes/subgoals-api-routes.js")(app);
require("./controllers/routes/tasks-api-routes.js")(app);
require("./controllers/routes/user-api-routes.js")(app);
require("./controllers/routes/passport-api-routes.js")(app);
require("./controllers/routes/passport-html-routes.js")(app);

// ======================== End Joel's work area =========================


// Requiring our models for syncing
const db = require("./models");

// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on: http://localhost:" + PORT);
  });
});
