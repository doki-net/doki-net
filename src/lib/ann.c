#include <stdio.h>
#include <stdlib.h>

int expectedArgs = 2;

int main (int argc, char** argv){
  // Check correct number of arguments are supplied
  if(argc == expectedArgs+1){
    // Correct number supplied
  }else{
    // Incorrect number supplied
    fprintf(stderr, "%i arguments where supplied, %i arguments expected", argc-1, expectedArgs);
    return 1;
  }
  getchar();
  return 0;
}
