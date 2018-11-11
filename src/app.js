const fs = require("fs");
const lib = require("./lib/lib.js");

var args = [];
if(process.argv[2] != undefined){
  args = [process.argv[2], process.argv[3]];
}
console.log(lib("lib/ann", args));
