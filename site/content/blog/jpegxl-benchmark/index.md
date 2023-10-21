---
title: "Jpegxl Benchmark"
date: 2023-09-14T02:47:42Z
draft: true
---

Pixboost URLs:

* https://images.officeworks.com.au/api/next/img/https://www.officeworks.com.au/images/Homepage/carousel/2023/20230907_Samsung_Galaxy_S23.jpg/optimise?auth=MjA5OTcwODkwMg__

* https://images.officeworks.com.au/api/next/img/https://www.officeworks.com.au/images/Homepage/whats-new/2023/ALNF.jpg/optimise?auth=MjA5OTcwODkwMg__

* https://pixboost.com/api/2/img/%2F%2Fnuestrosecreto.com.mx%2Fcdn%2Fshop%2Ffiles%2Fafiliado.png%3Fv%3D1686236847%26width%3D600/optimise?auth=MTEzNjY2NjY2



Golang Benchmarks:
```
goos: linux
goarch: amd64
pkg: github.com/Pixboost/transformimgs/v8/img/processor
cpu: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
```

JPEG - 25080824 ns/op
WebP -  76014653 ns/op
AVIF - 93139676 ns/op
JXL - 106576884 ns/op

Memory:
```
dimka@dimkaxps:~/Downloads$ /usr/bin/time -f "%e %M" convert big-jpeg.jpg -define jxl:effor=7 -quality 82 jxl:big-jpeg.jxl
2.53 1366220
dimka@dimkaxps:~/Downloads$ /usr/bin/time -f "%e %M" convert big-jpeg.jpg -define heic:speed=6 -quality 70 avif:big-jpeg.avif
2.08 525672
```
