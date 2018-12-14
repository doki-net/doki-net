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
  for(var a=0; a<10000; a++){
    net = exports.mutateJsonANN(net);
  }
  return net;
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
    if(net2['nodes'].length == 0) return net2;
    var a = Math.floor(Math.random()*(net2['nodes'].length-1));
    net2['nodes'][a]['bias'] = (0.7*net2['nodes'][a]['bias'])+(0.3*Math.random());
    return net2;
  }
  var modEdge = function(net2){
    if(net2['edges'].length == 0) return net2;
    var a = Math.floor(Math.random()*(net2['edges'].length-1));
    net2['edges'][a]['weight'] = (0.7*net2['edges'][a]['weight'])+(0.3*Math.random());
    return net2;
  }
  var addNode = function(net2){
    var a = Math.floor(Math.random()*(net2['nodes'].length));
    for(var b=net2['nodes'].length; b>a; b--){
      net2['nodes'][b] = net2['nodes'][b-1];
    }
    net2['nodes'][a] = {'bias':Math.random()};
    for(var b=0; b<net2['edges'].length; b++){
      if(net2['edges'][b]['from'] > a){
        net2['edges'][b]['from']++;
      }
      if(net2['edges'][b]['to'] > a){
        net2['edges'][b]['to']++;
      }
      if(net2['edges'][b]['to'] == a || net2['edges'][b]['from'] == a){
        net2['edges'].splice(b, 1);
      }
    }
    return net2;
  }
  var addEdge = function(net2){
    var f = Math.floor(Math.random()*(net2['nodes'].length-2));
    var t = Math.floor(Math.random()*(net2['nodes'].length-1-f))+f+1;
    net2['edges'][net2['edges'].length] = {"from":f, "to":t, "weight":Math.random()};
    return net2;
  }
  var rmNode = function(net2){
    if(net2['nodes'].length <= net2['inSize']+net2['outSize']) return net2;
    var a = Math.floor(Math.random()*(net2['nodes'].length-1));
    net2['nodes'].splice(a, 1);
    for(var b=0; b<net2['edges'].length; b++){
      if(net2['edges'][b]['from'] > a){
        net2['edges'][b]['from']--;
      }
      if(net2['edges'][b]['to'] > a){
        net2['edges'][b]['to']--;
      }
      if(net2['edges'][b]['to'] == a || net2['edges'][b]['from'] == a){
        net2['edges'].splice(b, 1);
      }
    }
    return net2;
  }
  var rmEdge = function(net2){
    if(net2['edges'].length == 0) return net2;
    var a = Math.floor(Math.random()*(net2['edges'].length-1));
    net2['edges'].splice(a, 1);
    return net2;
  }

  while(Math.random() < net2['mutationRate']){
    var options = [addNode, addEdge, addEdge, modRate];
    for(var a=0; a<net['nodes'].length; a++){
      options[options.length] = rmNode;
      options[options.length] = modNode;
    }
    for(var a=0; a<net['edges'].length; a++){
      options[options.length] = rmEdge;
      options[options.length] = modEdge;
      options[options.length] = rmEdge;
      options[options.length] = modEdge;
    }
    net2 = options[Math.floor(Math.random()*(options.length-1))](net2);
  }
  return net2;
}

//******************************************************************************
// jsonANNToString
//
// Produces a string of values comma seperated that dictate the network
//
// Inputs:
//  - net : the input json object specifying the network
//******************************************************************************
exports.jsonANNToString = function(net){
  var str = ""+net['inSize'];
  str += ","+net['outSize'];
  str += ","+net['nodes'].length;
  str += ","+net['edges'].length;
  for(var a=0; a<net['nodes'].length; a++){
    str += ","+net['nodes'][a]['bias'];
  }
  for(var a=0; a<net['edges'].length; a++){
    str += ","+net['edges'][a]['from'];
    str += ","+net['edges'][a]['to'];
    str += ","+net['edges'][a]['weight'];
  }
  return str;
}
