const fs = require("fs");
const lib = require("./lib/lib.js");
const util = require("./lib/util.js");

const popSize = 500;
const generations = 100;
const inSize = 3;
const outSize = 3;

function equal (a, b) {
  if (a.length != b.length) {
    return false;
  }

  for (var i=0; i<a.length; i++) {
    if (a[i] != b[i]) {
      return false;
    }
  }

  return true;
}

var fitFunc = function(net){
  var fitness = 0;
  var result = lib("lib/ann", [util.jsonANNToString(net), "3,0,0,0"])['stdout'].split(',');
  fitness += Math.min(1, 1+parseFloat(result[0]));
  fitness += Math.min(1, 0-parseFloat(result[1]));
  fitness += Math.min(1, 0-parseFloat(result[2]));
  result = lib("lib/ann", [util.jsonANNToString(net), "3,1,0,0"])['stdout'].split(',');
  fitness += Math.min(1, 0-parseFloat(result[0]));
  fitness += Math.min(1, 1+parseFloat(result[1]));
  fitness += Math.min(1, 0-parseFloat(result[2]));
  result = lib("lib/ann", [util.jsonANNToString(net), "3,0,1,0"])['stdout'].split(',');
  fitness += Math.min(1, 1+parseFloat(result[0]));
  fitness += Math.min(1, 1+parseFloat(result[1]));
  fitness += Math.min(1, 0-parseFloat(result[2]));
  result = lib("lib/ann", [util.jsonANNToString(net), "3,1,1,0"])['stdout'].split(',');
  fitness += Math.min(1, 0-parseFloat(result[0]));
  fitness += Math.min(1, 0-parseFloat(result[1]));
  fitness += Math.min(1, 1+parseFloat(result[2]));
  result = lib("lib/ann", [util.jsonANNToString(net), "3,0,0,1"])['stdout'].split(',');
  fitness += Math.min(1, 1+parseFloat(result[0]));
  fitness += Math.min(1, 0-parseFloat(result[1]));
  fitness += Math.min(1, 1+parseFloat(result[2]));
  result = lib("lib/ann", [util.jsonANNToString(net), "3,1,0,1"])['stdout'].split(',');
  fitness += Math.min(1, 0-parseFloat(result[0]));
  fitness += Math.min(1, 1+parseFloat(result[1]));
  fitness += Math.min(1, 1+parseFloat(result[2]));
  result = lib("lib/ann", [util.jsonANNToString(net), "3,0,1,1"])['stdout'].split(',');
  fitness += Math.min(1, 1+parseFloat(result[0]));
  fitness += Math.min(1, 1+parseFloat(result[1]));
  fitness += Math.min(1, 1+parseFloat(result[2]));
  result = lib("lib/ann", [util.jsonANNToString(net), "3,1,1,1"])['stdout'].split(',');
  fitness += Math.min(1, 0-parseFloat(result[0]));
  fitness += Math.min(1, 0-parseFloat(result[1]));
  fitness += Math.min(1, 0-parseFloat(result[2]));
  return fitness;
}

var pop = [];
for(var a=0; a<popSize; a++){
  pop[a] = util.generateJsonANN(inSize, outSize);
}

var avgFitness = 0;
var a=0;
while(avgFitness < 20){
  a++;
  console.log("Generation: "+a);

  var fitnesses = [];
  avgFitness = 0;

  for(var b=0; b<popSize; b++){
    var fitness = fitFunc(pop[b]);
    avgFitness += fitness;
    fitnesses[b] = fitness;
  }

  avgFitness /= popSize;
  console.log("avgFitness: "+avgFitness);

  var newPop = [];
  for(var b=0; b<popSize; b++){
    var c = Math.floor(Math.random()*popSize);
    while(fitnesses[c] < avgFitness){
      c = Math.floor(Math.random()*popSize);
    }
    newPop[b] = util.mutateJsonANN(pop[c]);
  }
  pop = newPop;

  console.log("\n")
}
