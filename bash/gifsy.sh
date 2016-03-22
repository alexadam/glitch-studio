#!/bin/sh
rm gifsy/*
mkdir -p gifsy
inputfile=$1;
extension="${inputfile##*.}";
filename="${inputfile%.*}";
for f in $(seq 25); do cp $inputfile gifsy/$filename$f.$extension; done
convert -delay 10 -loop 0 gifsy/$filename*.$extension $filename.gif
rm -rf gifsy
