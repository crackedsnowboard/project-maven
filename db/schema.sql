CREATE DATABASE goals_db;

USE goals_db;

-- table layout, commented out because tables are instantiated with Sequelize
-- in models/maven.js, not by running the following code in MySQL workbench
-- CREATE TABLE goals (
-- 	id INT NOT NULL AUTO_INCREMENT,
-- 	goalName VARCHAR(256),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE subGoals (
-- 	id INT NOT NULL AUTO_INCREMENT,
--     subGoalName VARCHAR(256),
--     goalID INT NOT NULL,
--     FOREIGN KEY (goalID) REFERENCES goals(id),
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE tasks (
-- 	id INT NOT NULL AUTO_INCREMENT,
--     startTime VARCHAR(256),
--     endTime VARCHAR(256),
--     comments VARCHAR(256),
--     reaction INT NOT NULL,
--     subGoalID INT NOT NULL,
--     FOREIGN KEY (subGoalID) REFERENCES subGoals(id),
--     PRIMARY KEY (id)
-- );