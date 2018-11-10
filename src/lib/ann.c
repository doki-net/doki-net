//##############################################################################
// ann.c created by Oliver M Fallows for the M.O.N.I.K.A project.
// This c program executes a NEAT artifical neural network
//##############################################################################
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

// Exit codes
const int NO_ERROR=0;
const int BASIC_ERROR=1;
const int PROGRAM_ARGUMENTS_ERROR=2;
const int MALFORMED_NETWORK_STRING=3;
const int MALFORMED_INPUT_STRING=4;

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

//******************************************************************************
//*                          Utility Functions                                 *
//******************************************************************************

char * nextTok(char *p){
  if((p=strtok(NULL, ",")) == NULL){
    fprintf(stderr, "Tried to get next token, but next token is NULL\n");
    exit(MALFORMED_NETWORK_STRING);
  }
  return p;
}

double toDouble(char *p){
  double d;
  sscanf(p, "%lf", &d);
  return d;
}
int toInt(char *p){
  int i;
  sscanf(p, "%i", &i);
  return i;
}

//******************************************************************************
//*                             ANN Functions                                  *
//******************************************************************************

struct Network* loadNetwork(char *str){
  struct Network *net = malloc(sizeof(struct Network));

  char *p = strtok(str, ",");
  int nodeCount=toInt(p);
  p = nextTok(p);
  int edgeCount=toInt(p);

  net->nodes = malloc(sizeof(struct Node)*nodeCount);
  net->edges = malloc(sizeof(struct Edge)*edgeCount);

  int a=0;
  while(a < nodeCount){
    p = nextTok(p);
    net->nodes[a].bias = toDouble(p);
    net->nodes[a].val=0;
    a++;
  }

  a=0;
  while(a < edgeCount){
    p = nextTok(p);
    net->edges[a].from = toInt(p);
    p = nextTok(p);
    net->edges[a].to = toInt(p);
    p = nextTok(p);
    net->edges[a].weight = toDouble(p);
    a++;
  }

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
    fprintf(stderr, "%i argument(s) where supplied, %i argument(s) expected\n",
            argc-1, expectedArgs);
    return PROGRAM_ARGUMENTS_ERROR;
  }

  fprintf(stderr, "Using arguments:\n");
  for(int a=0; a<argc; a++){
    fprintf(stderr, "%s\n", argv[a]);
  }

  // Load network
  struct Network *net;
  if(*argv[2] == '1'){
    // Load from file
  }else{
    // Load from parsed parameters
    net = loadNetwork(argv[1]);
    printf("%f", net->edges->weight);
  }

  // Load input

  return 0;
}
