---
title: "Jpegxl Benchmark"
date: 2023-09-14T02:47:42Z
draft: true
---

JPEG XL is the next generation format that aims to encode with better efficiency.

The new format gained traction in the Web Development when Apple announced it support in Safari 17.

Pixboost Team is happy to report that we added the support to our Image CDN, so we can save extra bytes
for Safari users.

In this post, I'll go a bit into the details of the implementation and support our decisions by 
benchmarks results we ran.

But before we dive into the technical details, let me summarize an outcome.

## TLDR

We ran tests for both lossless and lossy compressions for our use case - ecommerce image CDN. It's important to 
understand that for different use case the results could be different. However, you could use the same technique 
and commands from this post to run on your image set.

So, how did JpegXL fit in our formats algorithm?

For lossless compression we compared JpegXL to WebP lossless cause that's what we use when decided to [use lossless compression](). On average, JpegXL produced **7% smaller images**, in some cases going **up to 20%**. These results were achieved using the highest encoder effort (9) and that led to high consumption of memory and CPU. So, we made the decision to only use JPEGXL for images up to 1000x1000 pixels. Just as a note, we used similar strategy with AVIF which improved resource utilisation in the later version. We hope to do the same with JXL.



## JPEG XL support in Pixboost Image CDN

Pixboost URLs:

* https://images.officeworks.com.au/api/next/img/https://www.officeworks.com.au/images/Homepage/carousel/2023/20230907_Samsung_Galaxy_S23.jpg/optimise?auth=MjA5OTcwODkwMg__

* https://images.officeworks.com.au/api/next/img/https://www.officeworks.com.au/images/Homepage/whats-new/2023/ALNF.jpg/optimise?auth=MjA5OTcwODkwMg__

* https://pixboost.com/api/2/img/%2F%2Fnuestrosecreto.com.mx%2Fcdn%2Fshop%2Ffiles%2Fafiliado.png%3Fv%3D1686236847%26width%3D600/optimise?auth=MTEzNjY2NjY2


IM Version:

```
Version: ImageMagick 7.1.1-17 Q16-HDRI x86_64 354c3e45e:20230919 https://imagemagick.org
Copyright: (C) 1999 ImageMagick Studio LLC
License: https://imagemagick.org/script/license.php
Features: Cipher DPC HDRI OpenMP(4.5)
Delegates (built-in): heic jng jpeg jxl png webp x xml zlib
Compiler: gcc (12.2)
```

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
