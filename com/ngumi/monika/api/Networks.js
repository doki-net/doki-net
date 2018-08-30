//##############################################################################
//                        RNN Object Declaration
//##############################################################################

exports.RNN = function(structure){
  this.nodes = JSON.parse(structure)["nodes"];
  this.edges = JSON.parse(structure)["edges"];

  // default activation function
  this.activationFunction = function(node){
    node["val"] = Math.tanh(node["val"]);
    node["m"][0] = node["m"][0]*node["a"]+(1-node["a"])*node["val"];
    for(var a=1; a<node["m"].length; a++){
      node["m"][a] = node["m"][a]*node["a"]+(1-node["a"])*node["m"][a-1];
    }
    node["val"] = 0;
    for(var a=node["m"].length-1; a>=0; a--){
      node["val"] += node["m"][a];
      if(a<node["m"].length-1)node["val"] /= 2;
    }
    return node;
  };

  this.reset = function(){
    for(var a=0; a<this.nodes.length; a++){
      for(var b=0; b<this.nodes[a].length; b++){
        for(var c=0; c<this.nodes[a][b]["m"].length; c++){
          this.nodes[a][b]["m"][c] = 0;
        }
      }
    }
  };

  this.step = function(inputs, skipErrorChecks=false){
    //##########################################################################
    //                           errors handling
    //##########################################################################
    //check if skip error checking.
    if(!skipErrorChecks){
      // check if number of inputs is equal to number of nodes in first layer
      if(inputs.length != this.nodes[0].length){
        var err = "ANN :: **ERROR** Miss match of input size and input layer size.";
        console.log(err);
        return {"e":true, "m":err};
      }

      // order all edges
    }
    //##########################################################################
    //                         actual functional code
    //##########################################################################
    // reset nodes.
    for(var a=1; a<this.nodes.length; a++){
      for(var b=0; b<this.nodes[a].length; b++){
        this.nodes[a][b]["activated"] = false;
        this.nodes[a][b]["val"] = this.nodes[a][b]["bias"];
      }
    }

    // add inputs to first layer of nodes
    for(var a=0; a<this.nodes[0].length; a++){
      this.nodes[0][a]["activated"] = false;
      this.nodes[0][a]["val"] = inputs[a]+this.nodes[0][a]["bias"];
    }

    // loops through all edges
    for(var a=0; a<this.edges.length; a++){
      var n = this.nodes[this.edges[a]["fcol"]][this.edges[a]["fid"]];
      if(!n["activated"]){
        n = this.activationFunction(n);
      }
      this.nodes[this.edges[a]["tcol"]][this.edges[a]["tid"]]["val"] += n["val"]*this.edges[a]["weight"];
    }

    // get result from output layer
    var outLayer = this.nodes[this.nodes.length-1];
    var result = [];
    for(var a=0; a<outLayer.length; a++){
      if(!outLayer[a]["activated"]){
        outLayer[a] = this.activationFunction(outLayer[a]);
      }
      result[a] = outLayer[a]["val"];
    }
    return result;
  };

  this.run = function(inputList){
    var results = [];
    for(var a=0; a<inputList.length; a++){
      results[results.length] = this.step(inputList[a]);
    }
    return results;
  };

  //############################################################################
  //                         Genetic algorithm code
  //############################################################################

  this.addNode(){
    // new layer?
    var newLayer = Math.random() < 0.5;
    // what layer?
    var layer = Math.floor(Math.random()*(this.nodes.length-2+(newLayer?1:0)))+1;
    // what values?
    // if new layer adjust other layers
    // add node
  };
  this.addEdge(){
    // from node?
    // to node?
    // what weight?
    // add edge
  };
  this.modNode(){
    // what node
    // new value
  };
  this.modEdge(){
    // what edge
    // new weight
  };
  this.removeNode(){
    // what node
    // remove node
  };
  this.removeEdge(){
    // what edge
    // remove edge
  };
  this.mutate = function(){
    if(this.mutateRate <= 0 || this.mutateRate >= 1){
      this.mutateRate = 0.1;
    }
    while(Math.random() < this.mutateRate){

    }
  };
}
