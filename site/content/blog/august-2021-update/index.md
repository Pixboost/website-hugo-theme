---
title: "August 2021 Update"
date: 2021-08-15T00:00:00Z
description: "Improved encoding performance for the next generation images, new features in Dashboard, API and more in the latest update."
image: august-2021-update.jpg
draft: false
v2: true
---

We've done quite a bit of work in the last months and are proud to share all the things we released recently. The new features touched every bit of the service starting in the image optimisation backend, following by API enhancements and finishing in the dashboard. 

<!--more-->

So, buckle up and let's get into it!

## Backend updates to AVIF and Webp

The image optimisation engine is the heart of the Image CDN. This is the value we deliver to you, by improving the User Experience of your clients. 

We updated our implementation for both WebP and AVIF encoders. Currently, AVIF and WebP are 90% of the images we serve, so that was a big step forward. There were several reasons we did it:

1. AVIF is a relatively new format, so things are still moving there actively. We noticed that in the Canary release of Chrome 92 our AVIF images stopped working. Turned out [Chrome added additional validation](https://bugs.chromium.org/p/chromium/issues/detail?id=1198455) on the file format. We were able to fix the issue in the week time and released a fix into production.

2. There was a major release of [libaom](https://aomedia.googlesource.com/aom/) that we use for the AVIF encoder that had a few improvements. We've been particularly interested in the performance-related tweaks, so we took it for a spin. We ran a test on 110 most popular images, and you could find encoding times in the table below

| libaom 2.0.2 (ms)  | libaom v3.1.0 (ms) | Difference | Gain    |
| :----------------: | :----------------: | :--------: | :-----: |
| 246496148          | 175636573          | 70859575   | **28%** |

3. There was another update to libaom, and we updated it again from v3.0.0 to v3.1.0 and did the same tests, but this time on the 138 most popular images:

| libaom 3.0.0 (ms)  | libaom v3.0.0 (ms) | Difference | Gain    |
| :----------------: | :----------------: | :--------: | :-----: |
| 234155020          | 209962539          | 70859575   | **10%** |

4. There was also a new release of [libwebp](https://chromium.googlesource.com/webm/libwebp) that fixed a few non-critical issues, but also promised further latency benefits. We did the same performance tests and here are the results:

| libwebp (ms)  | libwebp v1.2.0 (ms) | Difference | Gain    |
| :-----------: | :-----------------: | :--------: | :-----: |
| 242599917     | 212111298           | 17398440   | **12%** |

As you could see we improved the response time for previously non-transformed images by:

* 38% for AVIF
* 12% for WebP

It's also worth mentioning that the Pixboost engine is open sources, and you could find the API with above enhancements on GitHub here: [https://github.com/Pixboost/transformimgs](https://github.com/Pixboost/transformimgs)

## HTTP Image Source

This is something many of you asked for and was on our priority list. HTTP image source is an alias for a part of the source URL, so it makes an API call shorter and there is no need for 2 domain names which could look a bit tedious. For example, using the original images' domain approach your API request would look like this:

```html
https://pixboost.com/api/2/img/https://yourwebsite.com/images/logo.png/optimise?auth=API_KEY
```

You could create an HTTP image source with an alias `images` that will point to `https://yourwebsite.com/images`, so the exact request as above will be:

```html
https://pixboost.com/api/2/img/images/logo.png/optimise?auth=API_KEY
```

As you could see there is no domain name and long prefixes could roll up in shorter alternatives.

{{< simple-image image="add-http-image-source.png" alt="Add HTTP image source">}}

[Read more in the documentation](https://help.pixboost.com/setup/adding-http-image-source)

## Analytics in Dashboard

We made a start to analytics insights in Pixboost. Now, you could find:

* How many images you transformed
* What was the optimised traffic in the last 30 days 
* What CDN hit ratio is

We have plans to add more to that with errors and savings come shortly. If you have an idea - shoot us a message at customer.service@pixboost.com

{{< simple-image image="analytics.png" alt="Analytics in Pixboost">}}

## Billing history in the dashboard

This is another enhancement (some may say necessity:)) in the Dashboard. Since June, you can find the last 12 months of your usage and payments history by navigating to the "Billing" section. 

{{< simple-image image="billing-history.png" alt="Billing history">}}

## Caching of source images for AWS S3 buckets

Pixboost doesn't have storage that our clients can manage. We believe that there are quite a few tools that doing a great job in that space, and we don't anticipate to be another one. So, when you call Pixboost API it fetches the image from the source. Typically when implementing responsive images patter on your website, you'll have more than one transformation for one source image. So, it would make sense to fetch the source image once and cache it for the subsequent requests. 

The cache was always there for HTTP image source (domain and source), but now we also implemented it for AWS S3 buckets. This is an additional cost-saving on AWS bandwidth and latency reduction that we delivered.

[Read more on how to setup AWS S3 bucket integration in the documentation](https://help.pixboost.com/setup/adding-s3-bucket-image-source)

## Warmup API Workflow

Pixboost has special API endpoints that are used for workflow implementations. For a little while, we had only one workflow for cache invalidation. We are happy to announce a new addition that allows you to trigger transformations, so they will be pre-cached, therefore reducing latency on the very first call.

The API endpoint could be reached by using `POST` request on `/api/2/img/warmup?auth=[API_SECRET]`. You would need to pass all the transformations you'd like to execute in the body of the request, and it will execute them asynchronously generating and caching all the image variants.

This workflow could be useful when your users are uploading content, so you could trigger cache warmup on the upload.

{{< simple-image image="cache-warmup.png" alt="Cache Warmup scenario">}}

## Conclusion

We are thrilled by each release we are doing and have a long healthy roadmap ahead of us. Often, the features and enhancements we implement are based on your feedback. Have anything you'd like to pass to us? Just message us in the chat from this page, email us on [customer.service@pixboost.com](mailto:customer.service@pixboost.com) or tweet with a [@pixboost](https://twitter.com/pixboost) mention!