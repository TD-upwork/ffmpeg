#!/bin/bash

varStart=$1
varEnd=$2
varOutput=$3
varName=$4

cd / &&
cd tempFolder &&
ffmpeg -ss $varStart -to $varEnd -i $varName -c copy $varOutput &&
ls

