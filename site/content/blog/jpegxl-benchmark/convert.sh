#!/bin/bash

set -e

for i in {1..3}
do
  /usr/bin/time -f "AVIF ${i}: %e %M" magick ./lossy-${i}.jpeg -quality 70 -define heic:speed=6 avif:./lossy-${i}.avif
  /usr/bin/time -f "JXL ${i}: %e %M" magick ./lossy-${i}.jpeg -quality 82 -define jxl:effort=7 jxl:./lossy-${i}.jxl
  /usr/bin/time -f "WEBP ${i}: %e %M" magick ./lossy-${i}.jpeg webp:./lossy-${i}.webp
  echo "----------------------------"
done

/usr/bin/time -f "AVIF ${i}: %e %M" magick ./lossless.png -define heic:speed=6 -quality 100 avif:./lossless.avif
/usr/bin/time -f "JXL ${i}: %e %M" magick ./lossless.png -define jxl:effort=9 -quality 100 jxl:./lossless.jxl
/usr/bin/time -f "WEBP ${i}: %e %M" magick ./lossless.png -define webp:lossless=true -quality 100 -define webp:method=6 webp:./lossless.webp
