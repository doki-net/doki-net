
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

exports.loadNetwork = function(data, inputNodes, outputNodes, nodeSize=2, edgeSize=3){
  var struct = {
    'n' : [],
    'e' : []
  };
  for(var a=0; a<data['n']; a+=nodeSize){
    struct['n'][a/nodeSize] = [];
    for(var b=0; b<nodeSize; b++){
      struct['n'][a/nodeSize][b] = data['n'][a+b];
    }
  }
  for(var a=0; a<data['e']; a+=edgeSize){
    struct['e'][a/edgeSize] = [];
    for(var b=0; b<edgeSize; b++){
      struct['e'][a/edgeSize][b] = data['e'][a+b];
    }
  }
  return struct;
}
