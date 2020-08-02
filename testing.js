var moment = require("moment");

var startTime = moment("2020-08-02T09:48:29.791Z")
var stopTime = moment("2020-07-31T21:15:10.747Z")
console.log(stopTime.diff(startTime));

