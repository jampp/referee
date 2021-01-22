#!/bin/env sh

if [ -z "$1" ]; then
    echo "usage: ./build.sh <docker tag>"
else
    yarn install
    yarn build
    docker build --tag "$1" .
fi
