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
echo "exicuting with argument 1,2,3,4,5"
(cd $BUILD_PATH && node app.js "1,2,3,4,5")
