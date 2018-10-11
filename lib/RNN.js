//##############################################################################
//                          RNN Object Declaration
//##############################################################################

module.exports = function(struct){
  this.struct = struct;
  // default activation function
  this.activationFunction = function(node){
    return node;
  };

  this.hardReset = function(){
    for(var a=0; a<struct['n'].length; a++){
      struct['n'][a][2] = 0;
      struct['n'][a][3] = false;
    }
  };
  this.reset = function(){
    for(var a=0; a<struct['n'].length; a++){
      struct['n'][a][2] *= struct['n'][a][1];
      struct['n'][a][2] += struct['n'][a][0];
      struct['n'][a][3] = false;
    }
  };

  this.step = function(inputs){
    if(struct['n'].length < struct['is']+struct['os']) {
      return {'e': true, 'o': struct};
    }

    // reset nodes.
    this.reset();

    // add inputs to first layer of nodes
    for(var a=0; a<inputs.length && a<struct['n'].length && a<struct['os']; a++){
      struct['n'][a][2] += inputs[a];
    }
    // loops through all edges
    for(var a=0; a<struct['e'].length; a++){
      var from = Math.ceil(struct['e'][a][0]*(struct['n'].length-1));
      from = Math.min(from, struct['n'].length-1);
      var to = Math.ceil((struct['e'][a][0]+struct['e'][a][1])*(struct['n'].length-1));
      to = Math.min(to, struct['n'].length-1);
      if(from != NaN && to != NaN){
        if(from != to){
          if(!struct['n'][from][3]){
            struct['n'][from] = this.activationFunction(struct['n'][from]);
          }
          struct['n'][to][2] += struct['n'][from][2]*struct['e'][a][2];
        }
      }
    }

    // get result from output layer
    var r = [];
    var i = 0;
    for(var a=struct['n'].length-struct['os']; a<struct['n'].length; a++){
      if(!struct['n'][a][3]){
        struct['n'][a] = this.activationFunction(struct['n'][a]);
      }
      r[i] = struct['n'][a][2];
      i++;
    }
    return {'e':false, 'o':r};
  };

  this.run = function(inputList){
    this.hardReset();
    var results = [];
    for(var a=0; a<inputList.length; a++){
      results[a] = this.step(inputList[a]);
      if(results[a]['e']){
        return results[a];
      }else{
        results[a] = results[a]['o'];
      }
    }
    return {'e':false, 'o':results};
  };
}
