---
title: "August 2021 Update"
date: 2021-08-15T00:00:00Z
description: "TODO"
image: TODO
draft: true
---

We've done quite a bit of work in last months and proud to share all the things we released recently.

## Backend updates to AVIF and Webp

We updated our implementation for both WebP and AVIF encoders. Currently, AVIF and WebP are 90% of the images we serve, so that was a big step. There were several reasons we did it:

1. AVIF is a relatively new format, so things are still moving there actively. We noticed that in Canary release of Chrome 92 our AVIF images stopped working. Turned out [Chrome added additional validation](https://bugs.chromium.org/p/chromium/issues/detail?id=1198455) on the file format. We were able to fix the issue in the week time and released a fix in production.

2. There was a major release of [libaom](https://aomedia.googlesource.com/aom/) that we use for AVIF encoder that had a few improvements. We've been particularly interested in performance related and took it for a spin. We ran a test on 110 most popular images and you could find encoding time below

| libaom 2.0.2 (ms)  | libaom v3.1.0 (ms) | Difference | Gain    |
| ------------------ | ------------------ | ---------- | ------- |
| 246496148          | 175636573          | 70859575   | **28%** |

3. There was another update to libaom and we updated it again from v3.0.0 to v3.1.0 and did the same tests, but this time on the 138 most popular images:

| libaom 3.0.0 (ms)  | libaom v3.1.0 (ms) | Difference | Gain    |
| ------------------ | ------------------ | ---------- | ------- |
| 234155020          | 209962539          | 70859575   | **10%** |

3. There was also a new release of [libwebp](https://chromium.googlesource.com/webm/libwebp) that fixed a few non-critical issues, but also promised a good performance improvements. We did the same performance test and here is th results:

| libwebp (ms)  | libwebp v1.2.0 (ms) | Difference | Gain    |
| ------------- | ------------------- | ---------- | ------- |
| 242599917     | 212111298           | 17398440   | **12%** |

As you could see we improved the response time for non-cached images by:

* 38% for AVIF
* 12% for WebP

## Show billing history



## Caching S3 source images
## Warmup API Workflow
## HTTP Image Source
## Analytics in Dashboard