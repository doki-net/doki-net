//##############################################################################
//                        RNN Object Declaration
//##############################################################################

module.exports = function(structure){
  this.nodes = JSON.parse(structure)["nodes"];
  this.edges = JSON.parse(structure)["edges"];
  this.mutationRate = JSON.parse(structure)["mutationRate"];

  // default activation function
  this.activationFunction = function(node){
    return node;
  };

  this.hardReset = function(){
    for(var a=0; a<this.nodes.length; a++){
      for(var b=0; b<this.nodes[a].length; b++){
        this.nodes[a][b]["val"] = 0;
        this.nodes[0][a]["activated"] = false;
      }
    }
  };
  this.reset = function(){
    for(var a=0; a<this.nodes.length; a++){
      for(var b=0; b<this.nodes[a].length; b++){
        this.nodes[a][b]["val"] *= this.nodes[a][b]["a"];
        this.nodes[0][a]["activated"] = false;
        this.nodes[a][b]["val"] += this.nodes[a][b]["bias"];
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
    this.reset();

    // add inputs to first layer of nodes
    for(var a=0; a<this.nodes[0].length; a++){
      this.nodes[0][a]["val"] += inputs[a];
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
    this.hardReset();
    var results = [];
    for(var a=0; a<inputList.length; a++){
      results[results.length] = this.step(inputList[a]);
    }
    return results;
  };
}
