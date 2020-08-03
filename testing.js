var moment = require("moment");

var start = moment("2020-08-01T06:30:00Z")
var stop = moment("2020-08-01T07:30:00Z")
console.log(stop.diff(start, "minutes"));