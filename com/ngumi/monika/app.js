var FS = require("fs");
var Networks = require('./api/Networks');

var net = new Networks.RNN(FS.readFileSync("./networks/exampleRNN.json"));
console.log(net);
console.log(net.run([[1],[1],[0],[1],[0],[1],[0],[0],[0],[0],[1]]));
