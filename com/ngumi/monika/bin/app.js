const FS = require("fs");
const UTIL = require('../lib/Util');
const RNN = require('../lib/RNN');

var baseNet = JSON.parse(FS.readFileSync('../cfg/exampleRNN.json'));

baseNet = UTIL.mutate(baseNet);
//console.log(pop.run([[0],[1],[0],[0],[0]]));
//console.log(pop.run([[0],[1],[0],[0],[0]]));
console.log(baseNet);
