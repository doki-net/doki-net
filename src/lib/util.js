//******************************************************************************
// generateJsonANN
//
// Generates a basic NEAT ANN in json formatting.
//
// Inputs:
//  - inputSize : number of nodes used for inputs
//  - outputSize : like inputSize but for output
//******************************************************************************
exports.generateJsonANN = function(inputSize, outputSize){
  var net = {};
  net['mutationRate'] = Math.random();
  net['inSize'] = inputSize;
  net['outSize'] = outputSize;
  net['edges'] = [];
  net['nodes'] = [];
  for(var a=0; a<inputSize+outputSize; a++){
    net['nodes'][a] = {'bias': Math.random()};
  }
  console.log(net);
  net = exports.mutateJsonANN(net);
  console.log(net);
}

//******************************************************************************
// mutateJsonANN
//
// creates an new network object that is then mutated leaving the original in
// tact. The new mutated network is then returned.
//
// Inputs:
//  - net : the supplied network json object
//
// Returns: returns the mutated network
//******************************************************************************
exports.mutateJsonANN = function(net){
  // Clone network
  var net2 = JSON.parse(JSON.stringify(net));
  var modRate = function(net2){
    net2['mutationRate'] = (0.7*net2['mutationRate'])+(0.3*Math.random());
    return net2;
  }
  var modNode = function(net2){

    return net2;
  }
  var modEdge = function(net2){

    return net2;
  }
  var addNode = function(net2){

    return net2;
  }
  var addEdge = function(net2){
    console.log('Adding - Edge');
    var f = Math.floor(Math.random()*(net2['nodes'].length-2));
    var t = Math.floor(Math.random()*(net2['nodes'].length-2-f))+f+1;
    net2['edges'][net2['edges'].length] = {"from":f, "to":t, "weight":Math.random()};
    return net2;
  }
  var rmNode = function(net2){

    return net2;
  }
  var rmEdge = function(net2){

    return net2;
  }

  var options = [addNode, addEdge, modRate];
  for(var a=0; a<net['nodes'].length; a++){
    options[options.length] = rmNode;
    options[options.length] = modNode;
  }
  for(var a=0; a<net['nodes'].length; a++){
    options[options.length] = rmEdge;
    options[options.length] = modEdge;
  }

  while(Math.random() < net2['mutationRate']){
    net2 = options[Math.floor(Math.random()*(options.length-1))](net2);
  }
  return net2;
}

//******************************************************************************
// jsonNetworkToString
//
// Produces a string of values comma seperated that dictate the network
//
// Inputs:
//  - net : the input json object specifying the network
//******************************************************************************
exports.jsonANNToString = function(net){

}
