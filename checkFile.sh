#!/bin/bash

FILENAME=log.txt

cd /tempFolder &&

if [ $(wc -l < "${FILENAME}") -eq 0 ]; then
    echo "File $FILENAME is empty" >> result.txt
else
    echo "File $FILENAME is not empty" >> result.txt
fi

