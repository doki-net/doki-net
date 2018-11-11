#!/bin/bash

BUILD_PATH=$1

# First test
echo "##############################"
echo "Test: 001"
echo "exicuting without arguments"
(cd $BUILD_PATH && node app.js)

echo ""
echo ""

# Second test
echo "##############################"
echo "Test: 002"
echo "exicuting with argument 1,1,2,1,0.0,0.0,0,1,0.1 1,0.5"
(cd $BUILD_PATH/lib/ && ./ann "1,1,2,1,0.0,0.0,0,1,0.1" "1,0.5")
echo $?

echo ""
echo ""

# Third test
echo "##############################"
echo "Test: 003"
echo "exicuting with argument 2,1,3,2,0.0,0.0,0.0,0,2,0.1,1,2,0.5 2,0.5,1"
(cd $BUILD_PATH/lib/ && ./ann "2,1,3,2,0.0,0.0,0.0,0,2,0.1,1,2,0.5" "2,0.5,1")
echo $?
