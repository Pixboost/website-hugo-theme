---
title: "Load Your Images Faster with the Next-Gen AVIF Format"
date: 2020-11-08T03:53:08Z
description: "TODO"
image: rally-car.jpg
draft: false
---

## Introduction

Images have come to dominate the Internet. Most of today’s websites are comprised of 50 to 80 percent images. 
Here at Pixboost, our mission is to optimize images, 
making them as small as possible so that we can serve them to our users as fast as possible. 

So we were excited to begin implementing the new image format, AVIF, which is supported in the latest version of Chrome (86), and which 
will be supported in the next version of Firefox. AVIF also has significant corporate support, in fact it’s championed 
specifically by Netflix. In this post, I’ll briefly cover the current state of web image formats and then I’ll do a 
comparison to show how AVIF enables pages to load faster.

## Image Types and Formats

There are two fundamental image types: raster and vector.

Vectors are the type you would use to create geometric primitives like lines, circles, rectangles, etc. They are mathematically based so can be scaled to an infinite size. Vectors also support text, so they tend to be used for things like icons and logos. The most popular file format for vectors is SVG, but we won’t be expanding upon that format in this post :).

Raster images on the other hand are made up of pixels (points), with each pixel having its own color. Graphics and photos tend to be raster, and the most popular raster file formats on the web are JPEG and PNG. The JPEG format is good for photos because it compresses them with some quality loss, but significantly reduces file sizes. The PNG format maintains complete quality and supports transparency, but doesn’t reduce file sizes as much. So from a practical perspective, JPEG is used in most cases and PNG is used primarily when transparency is required.

Then there’s WebP, a relatively new format developed about 10 years ago [that is now supported by most browsers](https://caniuse.com/?search=webp). 
Generally speaking, if you convert a JPEG or PNG image to a WebP image, the resulting file size will be 30% smaller and there will be no loss of quality. Nice, right?

However, **AVIF**, the new kid on the block, pushes the envelope even further for web developers. It compresses images better than WebP with the same quality! 

## File sizes: AVIF vs WebP vs PNG/JPEG 

We ran tests using our clients’ images. We picked 500 of our most popular images and ran them through our [/optimise](https://help.pixboost.com/api/optimise) endpoint with the following output formats: the original format (PNG/JPEG), WebP, and finally AVIF. 

Here are the results:

* In 93% of cases, the AVIF image was smaller than the WebP image
* On average, the AVIF image was 47% smaller than the WebP image
* The WebP image was smaller than an optimized PNG/JPEG image in 99% of cases
* On average, the WebP image was smaller than the PNG/JPEG image by 33%

So from these numbers, we can suggest the following best practices with respect to raster formats on the Web:

* Use AVIF if it’s browser supported, else
* Use WebP if it’s browser supported, else
* Use PNG or JPEG

Let's take a look at one specific example. Here's the source image:
![Fast red car](supercar.jpeg)

| Format | Size  |
|:------:|:-----:|
| [JPEG](supercar.jpeg)   | 101Kb |
| [WebP](supercar.webp)   | 66Kb  |
| [AVIF](supercar.avif)   | 33Kb  |

But what is the catch? Basically, AVIF is far more expensive to encode. It’s an extremely taxing process with respect to both CPU and memory. Using the same image set as above, we compared the required length of time to optimize images using WebP and AVIF, respectively. To process the 500 total images, it took:

* 391 seconds to load all of the WebP images
* 919 seconds to load all of the AVIF images

So that’s 2.5 times as long for AVIF, although the calculation included the time to download the images as well. 
When we compared just the CPU time to convert the images, we found that it took seven times more CPU time to convert AVIF vs. WebP.

Memory wise, when encoding a 1000x1000 image, the process consumed around 1GB of RAM.

But we also need to keep tooling in mind: it’s still early days for AVIF and so processes haven’t been optimized for it as they have been for WebP (for which it is possible to pick various performance options). 

## How would I use it?

In HTML, you can do as follows:

```html
<picture>
    <source srcset="supercar.avif" type="image/avif">
    <source srcset="supercar.webp" type="image/webp">
    <img src="supercar.jpeg" alt="Fast red car"/>
</picture>
```

Or if you use an image CDN (like Pixboost), it’s as simple as one line:

```html
<img src="img/supercar.jpeg" alt="Fast red car"/>
```

But if you aren’t using an image CDN, you would need to convert your source image into an AVIF, so let’s have a look at the tools you could use for that.

## Tools that support AVIF encoding

As I write this article in November 2020, it’s still early days for AVIF, so there aren’t currently a lot of options for using it. 

But here are some of the existing ones:

* [ImageMagick](https://imagemagick.org/): AVIF files have been writable since version 7.0.8. If you know Docker, you can [use this image](https://github.com/dooman87/imagemagick-docker) that I'm maintaining. ImageMagick has quite a powerful CLI, so you could easily automate AVIF conversion if necessary.
* [Squoosh](https://squoosh.app/) is a web app that lets you upload an image and then choose the formats to which you’d like to convert it. It’s quite powerful with a lot of settings, but doesn’t allow you to do batch processing, so you would need to convert each image individually.

## Supporting AVIF in the Pixboost Image CDN

Pixboost was one of the first image CDNs to introduce AVIF. Our API doesn’t require you to manually choose an image’s target format, but rather automatically selects the optimal format on a case-by-case basis. So if a client (web browser) supports AVIF, then generally an AVIF will be served. Pixboost uses `Accept` HTTP header to determine supported formats.

Let’s imagine that you have an image on your website that you currently serve as follows:

```html
<img src="/hero-banner.jpeg" alt="Superhero rescues the World"/>
```


To leverage the full power of AVIF with Pixboost, you can simply wrap the source URL like so:

```html
<img src="https://pixboost.com/yoursite.com/hero-banner.jpeg?optimise?auth=your-api-key"
     alt="Superhero rescues the World"/>
```

From this moment on, your image will be served in the optimal format!

Note that we currently have two limitations with respect to AVIF files:

* Source images cannot be larger than 1024x1024 pixels, which is related to memory consumption. We are working on a solution for this and will have it fixed soon.
* Transparent source images aren’t supported at the moment. This was a limitation of ImageMagick, which is used by Pixboost on the backend. ImageMagick actually already [merged our pull request](https://github.com/ImageMagick/ImageMagick/pull/2487) related to the issue, though, so we just need to update to the new version on our side. This will be done in the coming weeks.

## Conclusion

AVIF is a great addition to the Web, and I think it’ll soon see wide adoption since in most cases, it produces images that are much smaller than the JPEG/PNG/WebP formats. After all, smaller website images allow you to support users with slower Internet connections and also have a positive impact on SEO.

But at the moment adding AVIF support is a bit of a hassle. However, you can avoid the hassle by simply using a third-party service like the Pixboost CDN.
By the way, if you’d like to learn more about the AVIF format, I’d highly recommend watching this video by Google engineers:

{{< youtube F1kYBnY6mwg >}}
