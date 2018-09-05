var FS = require("fs");
var Networks = require('../lib/Network');
var GAManagers = require('../lib/GAManager');

var baseNet = '{"nodes":[[{"bias":0, "a":0, "m":[0]}],[],[{"bias":0, "a":0, "m":[0]}]],"edges":[],"mutationRate":0.9}';

function fitFunc(obj){
  return obj.run([[0]])[0][0];
}

var pop = [];
for(var a=0; a<100; a++){
  pop[a] = new Networks.RNN(baseNet);
  pop[a].mutate();
  pop[a].mutate();
  pop[a].mutate();
  pop[a].mutate();
  pop[a].mutate();
}

var gam = new GAManagers.GAManager({'population':pop, 'fitFunc':fitFunc});

for(var a=0; a<100; a++){
  gam.nextGeneration();
}
for(var a=0; a<gam.pop.length; a++){
  console.log(gam.pop[a].edges);
}
