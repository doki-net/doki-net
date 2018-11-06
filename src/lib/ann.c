//##############################################################################
// ann.c created by Oliver M Fallows for the M.O.N.I.K.A project.
// This c program executes a NEAT artifical neural network
//##############################################################################
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Variable declaration
const int expectedArgs = 2;

//##############################################################################
//#                           Struct declaration                               #
//##############################################################################

// A struct that is used to group the variables relating to each individual
// node within the network
struct Node{
  double bias;
  double val;
};

// A struct that is used to group the variables related to each individual
// edge within the network
struct Edge{
  double weight;
  int from;
  int to;
};

// A struct that is used to store the information about a network as well as the
// nodes and edges of the respective network.
struct Network{
  struct Node *nodes;
  struct Edge *edges;
  int inSize;
  int outSize;
};

//##############################################################################
//#                         Functions declaration                              #
//##############################################################################

char ** splitstr(char *str){
  char **results;
  int n=0;

  printf ("String \"%s\" is split into tokens:\n", str);
  for(char *p = strtok(str,",:"); p!= NULL; p = strtok(NULL, ",:")){
    n++;
  }

  results = malloc(n*sizeof(char*));

  int a=0;
  for(char *p = strtok(str,",:"); p!= NULL; p = strtok(NULL, ",:")){
    results[a] = p;
    a++;
  }

  return results;
}

struct Network* loadNetwork(char *str){
  struct Network *net = malloc(sizeof(struct Network));

  return net;
}

double* execute(struct Network net){
  return '\0';
}

//##############################################################################
//#                           Main declaration                                 #
//##############################################################################
int main(int argc, char** argv){
  // Check correct number of arguments are supplied
  if(argc != expectedArgs+1){
    // Incorrect number supplied
    fprintf(stderr, "%i arguments where supplied, %i arguments expected",
            argc-1, expectedArgs);
    return 1;
  }

  printf("Using arguments:\n");
  for(int a=0; a<argc; a++){
    printf("%s\n", argv[a]);
  }

  char **str = splitstr(argv[1]);
  int n = 0;

  printf("Result of split function on %s\n", argv[1]);
  printf("Split count: %i\n", n);
  for(int a=0; a<n; a++){
    printf("%i : %s\n", a, strs[a]);
  }

  return 0;

  // Load network
  struct Network *net;
  if(argv[2] == '1'){
    // Load from file
  }else{
    // Load from parsed parameters
    net = loadNetwork(argv[1]);
  }

  // Load input

  return 0;
}
