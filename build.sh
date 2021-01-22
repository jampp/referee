#!/bin/env sh

if [ -z "$1" ]; then
    echo "usage: ./build.sh <docker tag>"
else
    yarn build
    docker build --tag "$1" .
fi
