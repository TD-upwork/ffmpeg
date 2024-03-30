#!/bin/bash

varName=$1

cd /tempFolder &&
touch test.txt &&
rm -r * &&
mv /var/www/ffmpeg/views/tempStorage/tempSRT.srt /tempFolder &&
mv /var/www/ffmpeg/views/tempStorage/tempMP3.mp3 /tempFolder
