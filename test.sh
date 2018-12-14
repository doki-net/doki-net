#!/bin/bash

BUILD_PATH=$1

# First test
echo "##############################"
echo "Test: 001"
echo "executing app.js"
(cd $BUILD_PATH && node app.js)

echo ""
echo ""
