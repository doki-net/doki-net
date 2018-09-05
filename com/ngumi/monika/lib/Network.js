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
    this.reset();
    for(var a=0; a<inputList.length; a++){
      results[results.length] = this.step(inputList[a]);
    }
    return results;
  };

  //############################################################################
  //                         Genetic algorithm code
  //############################################################################

  this.addNode = function(){
    // new layer?
    var newLayer = Math.random() < (1/(this.nodes.length-1));
    // what layer?
    var layer = Math.floor(Math.random()*(this.nodes.length-2+(newLayer?1:0)))+1;
    // what values?
    var bias = Math.random();
    var alpha = Math.random();
    var m = [0];
    // if new layer adjust other layers
    if(newLayer){
      for(var a=this.nodes.length; a>=layer; a--){
        this.nodes[a] = this.nodes[a-1];
      }
      for(var a=0; a<this.edges.length; a++){
        if(this.edges[a]['fcol'] >= layer){
          this.edges[a]['fcol'] += 1;
        }
        if(this.edges[a]['tcol'] >= layer){
          this.edges[a]['tcol'] += 1;
        }
      }
    }
    // add node
    this.nodes[layer][this.nodes[layer].length] = {'bias':bias, 'a':alpha, 'm':m};
  };
  this.addEdge = function(){
    // from node?
    var l1 = Math.floor(Math.random()*(this.nodes.length-1));
    var n1 = Math.floor(Math.random()*this.nodes[l1].length);
    // to node?
    var l2 = Math.floor(Math.random()*(this.nodes.length-l1-1))+l1+1;
    var n2 = Math.floor(Math.random()*this.nodes[l2].length);
    // what weight?
    var w = Math.random();
    // add edge
    this.edges[this.edges.length] = {"fcol":l1, "fid":n1, "tcol":l2, "tid":n2, "weight":w};
  };
  this.modNode = function(){
    // what node
    var l = Math.floor(Math.random()*this.nodes.length);
    var n = Math.floor(Math.random()*this.nodes[l].length);
    // pick value and change it
    switch(Math.floor(Math.random()*4)){
      case 0:
        // mod bias
        this.nodes[l][n]['bias'] = Math.random();
        break;
      case 1:
        // mod alpha
        this.nodes[l][n]['a'] = Math.random();
        break;
      case 2:
        // add memory channel
        this.nodes[l][n]['m'][this.nodes[l][n]['m'].length] = 0;
        break;
      case 3:
        // remove memory channel
        if(this.nodes[l][n]['m'].length > 1){
          this.nodes[l][n]['m'].pop();
        }
        break;
    }

  };
  this.modEdge = function(){
    // what edge
    var edge = Math.floor(Math.random()*this.edges.length);
    // new weight
    this.edges[edge]['weight'] = Math.random();
  };
  this.removeNode = function(){
    // what node
    var l = Math.floor(Math.random()*(this.nodes.length-2))+1;
    var n = Math.floor(Math.random()*this.nodes[l].length);
    // remove node
    this.nodes[l].splice(n,1);
  };
  this.removeEdge = function(){
    // what edge
    var edge = Math.floor(Math.random()*this.edges.length);
    // remove edge
    this.edges.splice(edge, 1);
  };
  this.mutate = function(){
    if(this.mutateRate <= 0 || this.mutateRate >= 1){
      this.mutateRate = 0.1;
    }
    while(Math.random() < this.mutateRate){

    }
  };
}
