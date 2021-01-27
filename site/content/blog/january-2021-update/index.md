---
title: "January 2021 Update"
date: 2021-01-26T21:23:42Z
description: "Complete AVIF support, animated GIFs and React library enhancements are all landed in January 2021. Read details about all January updates in this blog!"
image: 2021.jpg
draft: false
---

Hi there, 

It's 2021, and we've already shipped some new exciting features around several components. Here is a quick recap of what we've been working on!

## Enhancements in AVIF support

As you might know [we've released AVIF](https://pixboost.com/blog/next-gen-avif-format/index.html) support last year and there were limitations on the source file size and support of PNG images with transparency.

We are happy to announce that we removed both limitations and completed our AVIF journey with the latest release of our API.

If you have PNG images and using Pixboost, you would expect them to become smaller with the same visual quality. Our cache upgrade policy is one month, so there could be a bit of a delay.

You can check the resulting image format in Chrome Web Developer tools by opening a network request and checking the content-type header.

{{< screencast video="check-image-format" >}}

## Animated GIFs support

Nowadays, animated GIFs are more often getting replaced by video, which's the right choice from the web performance point of view. However, if you still use them or have them on existing pages, you can optimise or resize them the same way you do it with JPEG or PNG images. Consider, the example below:

{{< simple-image image="vacuuming.gif" alt="Team work">}}

The original GIF size is 757Kb, and optimised version is just **256Kb** which is **67%** smaller than original!

## Pixboost React Improvements

React is one of the most popular web frameworks. To make the developers' life easier, we have [pixboost-react](https://github.com/Pixboost/pixboost-react) library that provides integration components to place images in apps.

We released a new [minor update](https://github.com/Pixboost/pixboost-react/releases/tag/v1.6.0) of the library, so you can pass additional options to configure [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) for lazy loaded images. By default, the margin is 40px meaning that the "below the fold" image will start loading when a user scrolled to a point where is 40 pixels left to the image.

## Conclusion

I would love to say big thanks to all our clients driving our roadmap, so it's easy for us to pick what to work on! We have many things planned for this year, so stay tuned!