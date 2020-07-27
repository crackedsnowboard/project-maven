// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Goals" model that matches up with DB
var Goals = sequelize.define("goals", {
    // the goalName gets saved as a string
    goalName: Sequelize.STRING,
}, {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true
});

// Creates a "subGoals" model that matches up with DB
var SubGoals = sequelize.define("subgoals", {
    // the subGoalName gets saved as a string
    subGoalName: Sequelize.STRING,
    // foreign key of goal ID. Points to the goal this sub goal belongs to
    referenceGoalID: {
        type: Sequelize.INTEGER,
        references: {
            model: "goals",
            key: "id"
        }
    }
}, {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true
});

Goals.hasMany(SubGoals);
SubGoals.belongsTo(Goals);

// Creates a "Tasks" model that matches up with DB
var Tasks = sequelize.define("tasks", {
    // the time the task was started, saved as a string. Result of calling JSON.stringify on a moment.js object
    startTime: Sequelize.STRING,
    // the time the task was ended, saved as a string. Result of calling JSON.stringify on a moment.js object
    endTime: Sequelize.STRING,
    // comments left by the user after the task was completed
    comments: Sequelize.STRING,
    // the user's reaction after the task was completed. Assigns an integer representative of their reaction
    // Red frown face = -1
    // Yellow neutral face = 0
    // Green smiley face = 1
    reaction: Sequelize.INTEGER,
    // foreign key of sub goal ID. Points to the sub goal this task belongs to
    referenceSubGoalID: {
        type: Sequelize.INTEGER,
        references: {
            model: "subgoals",
            key: "id"
        }
    }
}, {
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true
});

SubGoals.hasMany(Tasks);
Tasks.belongsTo(SubGoals);

// Syncs all models with the DB
// Goals.sync();
// SubGoals.sync();
// Tasks.sync();
sequelize.sync();

// Makes the Goals, SubGoals, and Tasks Models available for other files (will also create a table)
module.exports = {Goals, SubGoals, Tasks};
