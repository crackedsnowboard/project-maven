var moment = require("moment");

var test = moment("2020-07-02T06:30:00.000Z")
console.log(test.year() + test.month() + test.date())