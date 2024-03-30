#!/bin/bash

varID=$1

cd /var/www/ffmpeg/views &&
mkdir $varID &&
mv /tempFolder/* /var/www/ffmpeg/views/$varID

