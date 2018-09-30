const FS = require("fs");
const RNN = require('../lib/RNN');
var baseNet = '{"nodes":[[{"bias":0, "a":0}],[{"bias":0, "a":0}]],"edges":[],"mutationRate":0.9}';

var pop = new RNN(baseNet);
console.log(pop);
