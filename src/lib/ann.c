#include <stdio.h>
#include <stdlib.h>

// Variable declaration
const int expectedArgs = 4;

// Struct declaration

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
}

// A struct that is used to store the information about a network as well as the
// nodes and edges of the respective network.
struct Network{
  struct Node nodes;
  struct Edge edges;
  int inSize;
  int outSize;
}

int main (int argc, char** argv){
  // Check correct number of arguments are supplied
  if(argc != expectedArgs+1){
    // Incorrect number supplied
    printf("%i arguments where supplied, %i arguments expected", argc-1, expectedArgs);
    return 1;
  }

  // Load network

  // Load input

  return 0;
}
