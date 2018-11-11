#!/bin/bash

# Varibles
DATE_TIME=`date +%F-%H-%M`
BUILD_PATH="./build/$DATE_TIME"

# Check there is a build directory
if [ ! -d "./build/" ]; then
  mkdir "./build/"
fi

# Check if the build path exists
if [ -d $BUILD_PATH ]; then
  # If the build path exists then stop here
  echo "Path exists"
  echo "Exiting build script"
  exit
else
  # If the build path doesn't exist then create the build path and continue
  echo "Making directory"
  mkdir $BUILD_PATH
fi

# Copy all source files into the build path
cp -r ./src/* $BUILD_PATH/

# Compile all c files
(
  re="(.+)\.c"
  cd $BUILD_PATH/lib/ &&
  for f in *.c; do
    if [[ $f =~ $re ]]; then
      echo "Compiling $f" | tee ../compiler.log
      echo "`gcc $f -o ${BASH_REMATCH[1]} 2>&1`" >> ../compiler.log
      echo ""
    fi
  done
)

# Cleanup all c files
for f in $BUILD_PATH/lib/*.c; do
  echo "Removing $f"
  rm $f
done

./test.sh $BUILD_PATH
