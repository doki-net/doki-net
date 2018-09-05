//##############################################################################
//                  Genetic Algorithm Manager Object Declaration
//##############################################################################

exports.GAManager = function({population, fitFunc}){
  this.pop = population;
  // Check fitFunc is defined
  if(fitFunc == undefined){
    console.log("fitFunc must be defined as a function when calling GAManager.");
    return false;
  }
  // Check this.pop is set
  if(this.pop != undefined){
    // Check the this.pop array is populated
    if(this.pop.length == 0){
      console.log("Parsed this.pop array is empty.");
      return false;
    }

    // Check all this.pop elements contain required functions
    for(var a=0; a<this.pop.length; a++){
      if(typeof(this.pop[a].mutate) != "function"){
        console.log("Passed this.pop elements don't contain required functions.");
        console.log("this.pop elements require the function \"mutate\"");
        console.log("The function mutate doesn't accept any parameters and doesn't return anything");
        return false;
      }
    }
  }else{
    console.log("this.pop must be defined when calling GAManager.");
    return false;
  }

  this.nextGeneration = function(){
    var fitnesses = [];
    var fit = 0;
    var pop = [];
    for(var a=0; a<this.pop.length; a++){
      fitnesses[a] = fitFunc(this.pop[a]);
      fit += fitnesses[a];
    }
    fit /= this.pop.length;
    for(var a=0; a<this.pop.length; a++){
      var b;
      do{
        b = Math.floor(Math.random()*this.pop.length);
      }while(fitnesses[b] < fit);
      pop[a] = this.pop[b];
      pop[a].mutate();
    }
    this.pop = pop;
  }
}
