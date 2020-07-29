// Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory to be served
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main" }));
app.set("view engine", "handlebars");
// app.set("view options", {layout: "second"});


// ======================== Joel's work area =========================
// Import routes and give the server access to them.
// var routes = require("./controllers/mavenController.js");
require("./controllers/routes/html-routes.js")(app);
require("./controllers/routes/goals-api-routes.js")(app);
require("./controllers/routes/subgoals-api-routes.js")(app);
require("./controllers/routes/tasks-api-routes.js")(app);
require("./controllers/routes/user-api-routes.js")(app)

// ======================== Joel's work area =========================


// Requiring our models for syncing
const db = require("./models");

// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
