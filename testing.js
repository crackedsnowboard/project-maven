var moment = require("moment");

var now = moment();
var nowString = JSON.stringify(now)
console.log(nowString);
var nowObject = moment(nowString.postDate);
console.log(nowObject);
console.log(now.format("[Today is] dddd"));
console.log(nowObject.format("[Today is] dddd"));