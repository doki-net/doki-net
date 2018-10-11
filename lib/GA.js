const UTIL = require('./Util');
const RNN = require('./RNN');

module.exports = function(pop, fitFunc){
  var fitness = [];
  var newPop = [];
  var avgFitness = 0;
  var heightest = 0;
  for(var a=0; a<pop.length; a++){
    fitness[a] = fitFunc(pop[a]);
    avgFitness += fitness[a];
    if(fitness[heightest] < fitness[a]){
      heightest = a;
    }
  }
  avgFitness /= pop.length;
  console.log(avgFitness);
  newPop[0] = new RNN(pop[heightest].struct);
  newPop[1] = new RNN(UTIL.mutate(pop[heightest].struct));
  for(var a=2; a<pop.length; a+=2){
    var b = Math.floor(Math.random()*pop.length);
    var c = 0;
    while(fitness[b] < avgFitness && c < 1000){
      c++;
      b = Math.floor(Math.random()*pop.length);
    }
    newPop[a] = new RNN(pop[b].struct);
    newPop[a+1] = new RNN(UTIL.mutate(pop[b].struct));
  }
  return newPop;
}
