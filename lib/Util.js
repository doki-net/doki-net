
exports.oneHot1D = function(arr){
  var highV = arr[0];
  var highI = 0;
  for(var a=1; a<arr.lenght; a++){
    if(highV > arr[a]){
      arr[highI] = 0;
      highI = a;
      highV = arr[a];
    }else{
      arr[a] = 0;
    }
  }
  arr[highI] = 1;
  return arr;
};

exports.oneHotMultiD = function(arr){
  for(var a=0; a<arr.length; a++){
    arr[a] = exports.oneHot1D(arr[a]);
  }
  return arr[a];
};

exports.organiseNetwork = function(struct){
  struct['e'].sort(function(a, b){
    return a[0]-b[0];
  });
};

exports.mutate = function(src){
  let struct = JSON.parse(JSON.stringify(src));
  // Method used for adjusting edges
  const adjustEdges = function(struct, i, mod){
    for(var a=0; a<struct['e'].length; a++){
      if((struct['e'][a][0] == i || struct['e'][a][0]+struct['e'][a][1] == i) && mod < 0){
        // Remove the edge
        struct['e'].splice(a, 1);
        // Re-adjust iteration variable
        a--;
      }else if(struct['e'][a][0] < i && struct['e'][a][0]+struct['e'][a][1] >= i){
        // Update off-set
        struct['e'][a][1] += mod;
      }else if(struct['e'][a][0] >= i){
        // Update starting point
        struct['e'][a][0] += mod;
      }
    }
  }

  while(Math.random() < struct['mr']){
    if(struct['mr'] <= 0 || struct['mr'] >= 1){
      struct['mr'] = 0.1;
    }
    switch(Math.floor(Math.random()*7)){
      case 0: // Mutate node
        if(struct['n'].length <= 0){
          break;
        }
        var a = Math.floor(Math.random()*struct['n'].length);
        switch(Math.floor(Math.random()*2)){
          case 0:
            // Mutate bias
            struct['n'][a][0] += Math.random();
            struct['n'][a][0] *= 0.5;
            break;
          case 1:
            // Mutate alpha
            struct['n'][a][1] += Math.random();
            struct['n'][a][1] *= 0.5;
            break;
        }
        break;
      case 1: // Add node
        // Generate new node
        var n = [Math.random(), Math.random()];
        var a = Math.floor(Math.random()*struct['n'].length+1);
        // Adjust edges
        adjustEdges(struct, a, 1);
        //Add node to nodes array
        struct['n'].splice(a, 0, n);
        break;
      case 2: // Remove node
        if(struct['n'].length <= struct['is']+struct['os']){
          break;
        }
        // Select node
        var a = Math.floor(Math.random()*struct['n'].length);
        // Adjust edges
        adjustEdges(struct, a, -1);
        // Remove node
        struct['n'].splice(a, 1);
        break;
      case 3: // Mutate edge
        if(struct['e'].length <= 0){
          break;
        }
        var a = Math.floor(Math.random()*struct['e'].length);
        struct['e'][a][2] += Math.random();
        struct['e'][a][2] *= 0.5;
        break;
      case 4: // Add edge
        var a = Math.floor(Math.random()*struct['n'].length);
        var e = [a, Math.floor(Math.random()*(struct['n'].length-a-1))+1, Math.random()];
        struct['e'].splice(0, 0, e);
        break;
      case 5: // Remove edge
        if(struct['e'].length <= 0){
          break;
        }
        var a = Math.floor(Math.random()*struct['e'].length);
        struct['e'].splice(a, 1);
        break;
      case 6: // Change mutation rate
        struct['mr'] = Math.random();
        break;
    }
  }
  exports.organiseNetwork(struct);
  return struct;
};

exports.genNetwork = function(inSize, outSize, mr=0.1){
  var struct = {
    'n':[],
    'e':[],
    'mr':mr,
    'is':inSize,
    'os':outSize
  };
  for(var a=0; a<inSize; a++){
    struct['n'][struct['n'].length] = [0,0];
  }
  for(var a=0; a<outSize; a++){
    struct['n'][struct['n'].length] = [0,0];
  }
  return struct;
}
