#!/bin/bash
NODE_VERSION=$(node -v);
NODE_CHECK="v8.10.0";

if [ "$NODE_VERSION" != "$NODE_CHECK" ]
then
    echo "Use node $NODE_CHECK to match AWS Lambda configuration settings";
    exit 1;
fi

rm -rf ./dist
mkdir -p ./dist
cp -r index.js ./dist
cp -r package.json ./dist

cd ./dist

npm install

zip -r dist.zip *