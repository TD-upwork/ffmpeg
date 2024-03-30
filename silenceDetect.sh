#!/bin/bash

varName=$1

cd /tempFolder &&
ffmpeg -i $varName -af silencedetect=noise=-50dB:d=3,ametadata=print:file=log.txt -f null - 

