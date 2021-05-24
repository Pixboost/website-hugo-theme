---
title: "Why Pixboost Is the Best Image Cdn"
date: 2021-05-24T13:01:55Z
draft: true
---

We've got this question on Twitter and I thought that this is a huge gap that we haven't fill that elaborates our vision. Special thanks to @TODO for pointing this out.

TODO: Tweet card

I decided to structure this post in two sections. In the first part I'll talk about our open source image service which is the heart of Pixboost. I'll explain what the philosophy is and how it's different to other similar tools.

In the second part I'll go into our SaaS offering and why you could prefer it to our competitors.

## Transformimgs Open Source Image CDN

### Images service built for web

Our main focus is to build image service that covers needs of typical web project that gets loaded on the different browsers by people from different location on the different devices and different network quality.

Being web-first allows us to make some decisions like supporting formats that browsers support, or we could decide to not support some feature that are not widely adopted, e.g. client hints.

Targeting web also enables us to eliminate some features that we think should be done by other tools. For example, making image round should be done by CSS and not API.

### Opiniated API or simple is power

Our API has just 4 endpoints and you can't change much when using them. This is done intentionally and opens a few doors for us:

* Maintain API compatibility is easy. Without having thousands of options allow us to not worry about backward compatibility meaning the users don't need to look out for deprecated options and update their integration.
* Making algorithms smarter behind the scene. For instance, you can't specify the output format. Instead, we use the best possible format behind the scene. One of the examples would be AVIF and images with text. We found that on those images AVIF might generate some visible artifacts, so it's better to use WebP for those.
* Less code is a great advantage that generates less bugs. 

### Zero (almost) config

This is very close to the previous point, but is different. We still don't have config file, and you could only change behaviour using command line flags. We will try to keep it that way as long as possible.

For instance, some projects don't support next generation formats, like WebP or AVIF in the default configuration. In our case, we do support them, and you can't turn them off. 

### Containers optimised runtime



### CDN optimised

