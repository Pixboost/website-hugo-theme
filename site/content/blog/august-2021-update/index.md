---
title: "August 2021 Update"
date: 2021-08-15T00:00:00Z
description: "Improved encoding performance for next generation images, new features in dashboard and HTTP image source and more in the latest update."
draft: true
---

We've done quite a bit of work in last months and proud to share all the things we released recently.

## Backend updates to AVIF and Webp

We updated our implementation for both WebP and AVIF encoders. Currently, AVIF and WebP are 90% of the images we serve, so that was a big step. There were several reasons we did it:

1. AVIF is a relatively new format, so things are still moving there actively. We noticed that in Canary release of Chrome 92 our AVIF images stopped working. Turned out [Chrome added additional validation](https://bugs.chromium.org/p/chromium/issues/detail?id=1198455) on the file format. We were able to fix the issue in the week time and released a fix in production.

2. There was a major release of [libaom](https://aomedia.googlesource.com/aom/) that we use for AVIF encoder that had a few improvements. We've been particularly interested in performance related and took it for a spin. We ran a test on 110 most popular images and you could find encoding time below

| libaom 2.0.2 (ms)  | libaom v3.1.0 (ms) | Difference | Gain    |
| :----------------: | :----------------: | :--------: | :-----: |
| 246496148          | 175636573          | 70859575   | **28%** |

3. There was another update to libaom and we updated it again from v3.0.0 to v3.1.0 and did the same tests, but this time on the 138 most popular images:

| libaom 3.0.0 (ms)  | libaom v3.0.0 (ms) | Difference | Gain    |
| :----------------: | :----------------: | :--------: | :-----: |
| 234155020          | 209962539          | 70859575   | **10%** |

3. There was also a new release of [libwebp](https://chromium.googlesource.com/webm/libwebp) that fixed a few non-critical issues, but also promised a good performance improvements. We did the same performance test and here is th results:

| libwebp (ms)  | libwebp v1.2.0 (ms) | Difference | Gain    |
| :-----------: | :-----------------: | :--------: | :-----: |
| 242599917     | 212111298           | 17398440   | **12%** |

As you could see we improved the response time for non-cached images by:

* 38% for AVIF
* 12% for WebP

## Billing history in the dashboard

We started add more functionality to the dashboard and one of the essential pieces was a billing
history. You can find it by navigating to the "Billing" section of the dashboard. Each row shows 
the amount of used traffic and amount paid for the month:

{{< simple-image image="billing-history.jpeg" alt="Billing history">}}

## Caching of source images for AWS S3 buckets

Pixboost doesn't have a storage that our client can manage. We believe that there are quite a few tools that doing a great job in that and we don't anticipate to add it. So, when you call Pixboost API it will fetch the image from the source. Imagine you have more than transformations for the same source image. So, before we implemented this feature if the source image was coming from HTTP then we would cache it, but that wasn't the case for S3 sources. So now it is. This is an additional cost saving on AWS bandwidth and latency reduction that we delivered for our clients.

## Warmup API Workflow

Pixboost has a special API endpoints that used for workflow implementations. For a little while we had only one workflow for cache invalidation. We are happy to announce that there is a new addition that allows you to trigger transformations, so they will be pre-cached therefore reducing latency on the very first call.

The API endpoint could be reached by using `POST` request on `/api/2/img/warmup?auth=[API_SECRET]`. In the body of request you would need to pass all the transformations you'd like to execute, and it will execute the asynchronously generating and caching all the image variants.

This workflow could be useful when your users are uploading content, so you could trigger cache warmup on the upload.

{{< simple-image image="cache-warmup.png" alt="Cache Warmup scenario">}}

## HTTP Image Source

This is something many of our clients asked for and was on our priority list. HTTP image source is an alias for the part of source URL, so it's shorter. For example, using images domain your API request would look like:

`https://pixboost.com/api/2/img/https://yourwebsite.com/images/logo.png/optimise?auth=API_KEY`

You could create an HTTP image source with the name `images` that will point to `https://yourwebsite.com/images`, so the above request will be:

`https://pixboost.com/api/2/img/images/logo.png/optimise?auth=API_KEY`

{{< simple-image image="add-http-image-source.png" alt="Add HTTP image source">}}

## Analytics in Dashboard

We made a start in analytics space for Pixboost. Currently, you could see how many images you transformed, what was traffic in the last 30 days and what is CDN hit ratio. 

We have plans to add more to that with errors and savings come shortly. If you have an idea - shoot us a message on customer.service@pixboost.com

{{< simple-image image="analytics.png" alt="Analytics in Pixboost">}}
