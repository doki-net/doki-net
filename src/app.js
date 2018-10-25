const fs = require("fs");
const util = require('../lib/Util');
const rnn = require('../lib/RNN');
const ga = require('../lib/GA');

var inSize = 1;
var outSize = 1;

var baseNet = util.genNetwork(inSize, outSize, 0.999);

var fitFunc = function(net){
  var fitness = 0;
  var result = net.run([[0],[0],[0],[1]]);
  if(!result['e']){
    fitness += Math.abs(1-result['o'][3][0]);
  }
  var result = net.run([[0],[0],[1],[0]]);
  if(!result['e']){
    fitness += Math.abs(2-result['o'][3][0]);
  }
  var result = net.run([[0],[0],[1],[1]]);
  if(!result['e']){
    fitness += Math.abs(3-result['o'][3][0]);
  }
  var result = net.run([[0],[1],[0],[0]]);
  if(!result['e']){
    fitness += Math.abs(4-result['o'][3][0]);
  }
  var result = net.run([[0],[1],[0],[1]]);
  if(!result['e']){
    fitness += Math.abs(5-result['o'][3][0]);
  }
  var result = net.run([[0],[1],[1],[0]]);
  if(!result['e']){
    fitness += Math.abs(6-result['o'][3][0]);
  }
  var result = net.run([[0],[1],[1],[1]]);
  if(!result['e']){
    fitness += Math.abs(7-result['o'][3][0]);
  }
  var result = net.run([[1],[0],[0],[0]]);
  if(!result['e']){
    fitness += Math.abs(8-result['o'][3][0]);
  }
  var result = net.run([[1],[0],[0],[1]]);
  if(!result['e']){
    fitness += Math.abs(9-result['o'][3][0]);
  }
  var result = net.run([[1],[0],[1],[0]]);
  if(!result['e']){
    fitness += Math.abs(10-result['o'][3][0]);
  }
  var result = net.run([[1],[0],[1],[1]]);
  if(!result['e']){
    fitness += Math.abs(11-result['o'][3][0]);
  }
  var result = net.run([[1],[1],[0],[0]]);
  if(!result['e']){
    fitness += Math.abs(12-result['o'][3][0]);
  }
  var result = net.run([[1],[1],[0],[1]]);
  if(!result['e']){
    fitness += Math.abs(13-result['o'][3][0]);
  }
  var result = net.run([[1],[1],[1],[0]]);
  if(!result['e']){
    fitness += Math.abs(14-result['o'][3][0]);
  }
  var result = net.run([[1],[1],[1],[1]]);
  if(!result['e']){
    fitness += Math.abs(15-result['o'][3][0]);
  }
  var result = net.run([[0],[0],[0],[0]]);
  if(!result['e']){
    fitness += Math.abs(0-result['o'][3][0]);
  }
  return -fitness;
}

var pop = [];
for(var a=0; a<10; a++){
  pop[a] = new rnn(util.mutate(baseNet));
}


while(fitFunc(pop[0]) < -0.125){
  pop = ga(pop, fitFunc);
}
console.log(pop[0].struct);
