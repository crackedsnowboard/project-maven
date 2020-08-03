var db = require("../../models");
const moment = require("moment");
module.exports = function (app) {

    //  ================ Sam's Work Space ================

    // returns time spent each day on tasks for a given goal id
    app.get("/chartist/timeEachDay:id", function (req, res) {
        id = req.params.id;
        console.log(id);
        db.Goals.findAll({
            // raw: true,
            where: { id: req.params.id }
        }).then(function (data) {
            // console.log(data);
            GoalsData = {
                Goals: data,
            }
            findAllSubG1(GoalsData, id, res)
        });
    });
    // res.sendFile(path.join(__dirname, "../../second.html"));
    function findAllSubG1(GoalsData, id, res) {
        console.log("findAllSubG's called");
        db.Subgoals.findAll({
            // raw: true,

            where: {
                GoalId: id,
            },
            include: [
                {
                    model: db.Tasks,
                },
            ]
        }).then(function (data) {

            let combinedData = Object.assign(GoalsData, handleBarsData);
            tracked = {};
            for (i in combinedData.Subgoals) {
                for (j in combinedData.Subgoals[i].dataValues.Tasks) {
                    startTime = moment(combinedData.Subgoals[i].dataValues.Tasks[j].dataValues.startTime, "YYYY-MM-DDTHH:mm:ssZ");
                    stopTime = moment(combinedData.Subgoals[i].dataValues.Tasks[j].dataValues.stopTime, "YYYY-MM-DDTHH:mm:ssZ");
                    timeSpent = stopTime.diff(startTime, "minutes");
                    today = startTime.year().toString() + (startTime.month() + 1).toString() + startTime.date().toString();
                    if (today.length === 6) {
                        today = startTime.year().toString() + (startTime.month() + 1).toString() + "0" + startTime.date().toString();
                    }
                    if (tracked[today]) {
                        tracked[today] = tracked[today] + timeSpent;
                    } else {
                        tracked[today] = timeSpent;
                    }
                }
            }
            res.json(tracked);
        });

    };

    // returns time spent each day on tasks for a given goal id
    // app.get("/chartist/timeEachDay:id", function (req, res) {
    //     id = req.params.id;
    //     console.log(id);
    //     db.Goals.findAll({
    //         // raw: true,
    //         where: { id: req.params.id }
    //     }).then(function (data) {
    //         // console.log(data);
    //         GoalsData = {
    //             Goals: data,
    //         }
    //         findAllSubG2(GoalsData, id, res)
    //     });
    // });
    // // res.sendFile(path.join(__dirname, "../../second.html"));
    // function findAllSubG2(GoalsData, id, res) {
    //     console.log("findAllSubG's called");
    //     db.Subgoals.findAll({
    //         // raw: true,

    //         where: {
    //             GoalId: id,
    //         },
    //         include: [
    //             {
    //                 model: db.Tasks,
    //             },
    //         ]
    //     }).then(function (data) {

    //         let combinedData = Object.assign(GoalsData, handleBarsData);
    //         tracked = {};
    //         for (i in combinedData.Subgoals) {
    //             for (j in combinedData.Subgoals[i].dataValues.Tasks) {
    //                 startTime = moment(combinedData.Subgoals[i].dataValues.Tasks[j].dataValues.startTime, "YYYY-MM-DDTHH:mm:ssZ");
    //                 stopTime = moment(combinedData.Subgoals[i].dataValues.Tasks[j].dataValues.stopTime, "YYYY-MM-DDTHH:mm:ssZ");
    //                 timeSpent = stopTime.diff(startTime, "seconds");
    //                 today = startTime.year().toString() + startTime.month().toString() + startTime.date().toString();
    //                 if (tracked[today]) {
    //                     tracked[today] = tracked[today] + timeSpent;
    //                 } else {
    //                     tracked[today] = timeSpent;
    //                 }
    //             }
    //         }
    //         res.json(tracked);
    //     });

    // };
};