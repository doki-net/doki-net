//##############################################################################
// ann.c created by Oliver M Fallows for the M.O.N.I.K.A project.
// This c program executes a NEAT artifical neural network
//##############################################################################
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>
#include <math.h>

// Exit codes
const int NO_ERROR=0;
const int BASIC_ERROR=1;
const int PROGRAM_ARGUMENTS_ERROR=2;
const int MALFORMED_VALUE_STRING=3;
const int INPUT_SIZE_ERROR=4;
const int FAILED_TO_LOAD_NETWORK_FILE=5;
const int FAILED_TO_LOAD_INPUT_FILE=6;

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
  int processed;
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
  int nNode;
  int nEdge;
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
    exit(MALFORMED_VALUE_STRING);
  }
  return p;
}

//******************************************************************************
//*                             ANN Functions                                  *
//******************************************************************************

struct Node activationFunction(struct Node node){
  //node.val = tanh(node.val);
  node.processed = 1;
  return node;
}

struct Network* loadNetwork(char *str){
  struct Network *net = malloc(sizeof(struct Network));

  char *p = strtok(str, ",");
  printf("inSize token: %s\n", p);
  net->inSize = atoi(p);
  p = nextTok(p);
  printf("outSize token: %s\n", p);
  net->outSize = atoi(p);

  p = nextTok(p);
  printf("nNode token: %s\n", p);
  net->nNode=atoi(p);
  p = nextTok(p);
  printf("nEdge token: %s\n", p);
  net->nEdge=atoi(p);

  printf("%i, %i\n", net->nNode, net->nEdge);

  net->nodes = malloc(sizeof(struct Node)*net->nNode);
  net->edges = malloc(sizeof(struct Edge)*net->nEdge);

  int a=0;
  while(a < net->nNode){
    p = nextTok(p);
    printf("node bias token: %s\n", p);
    net->nodes[a].bias = (double)atof(p);
    net->nodes[a].val=0;
    net->nodes[a].processed=0;
    a++;
  }

  a=0;
  while(a < net->nEdge){
    p = nextTok(p);
    printf("edge from   token: %s\n", p);
    net->edges[a].from = atoi(p);
    p = nextTok(p);
    printf("edge to     token: %s\n", p);
    net->edges[a].to = atoi(p);
    p = nextTok(p);
    printf("edge weight token: %s\n", p);
    net->edges[a].weight = (double)atof(p);
    a++;
  }

  return net;
}

double* execute(struct Network *net, double *input){
  double *results = malloc(sizeof(double)*net->outSize);

  printf("Input count: %i\n", input[0]);
  if(input[0] != net->inSize){
    exit(INPUT_SIZE_ERROR);
  }

  for(int a=0; a<net->inSize; a++){
    net->nodes[a].val = input[a+1];
  }

  for(int a=0; a<net->nEdge; a++){
    printf("Edge: %i - %i - %f\n", net->edges[a].from, net->edges[a].to, net->edges[a].weight);
    int from = net->edges[a].from;
    int to = net->edges[a].to;
    printf("%i - %i:%f - %i:%f\n", a, from, net->nodes[from].val, to, net->nodes[to].val);
    if(!net->nodes[from].processed){
      net->nodes[from] = activationFunction(net->nodes[from]);
    }
    net->nodes[to].val += net->nodes[from].val*net->edges[a].weight;
    printf("%i - %i:%f - %i:%f\n", a, net->nNode, net->nodes[from].val, net->nEdge, net->nodes[to].val);
  }

  int aStart = net->nNode-net->outSize;

  for(int a=aStart; a<net->nNode; a++){
    results[a-aStart] = net->nodes[a].val;
  }

  return results;
}

//##############################################################################
//                            Main declaration
//
// Arguments:
//  - argc : number of arguments passed
//  - argv : a vector of the arguments passed
//    - argv[1] : network to load
//    - argv[2] : input data to use
//##############################################################################
int main(int argc, char** argv){
  // Check correct number of arguments are supplied
  if(argc != expectedArgs+1){
    // Incorrect number supplied
    fprintf(stderr, "%i argument(s) where supplied, %i argument(s) expected\n",
            argc-1, expectedArgs);
    return PROGRAM_ARGUMENTS_ERROR;
  }

  // Load network
  struct Network *net = loadNetwork(argv[1]);

  // Load input
  char *p = strtok(argv[2], ",");
  int n = atoi(p);
  printf("%i\n", n);
  double *inputs = malloc(sizeof(double)*(n+1));
  inputs[0] = n;
  for(int a=1; a<=n; a++){
    p = nextTok(p);
    inputs[a] = atof(p);
    printf("%i\n", a);
  }

  // Execute network
  double *results = execute(net, inputs);

  for(int a=0; a<net->outSize; a++){
    printf("%f,", results[a]);
  }

  return 0;
}
