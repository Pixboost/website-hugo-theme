---
title: "High DPI Display Support in API"
date: 2022-03-15T19:49:31Z
draft: true
description: "TODO"
image: cheetah.jpg
v2: true
---

## Intro

What is this blog about

Over the last decade we went from having PC and mobile phone to PC in the pocket and the Internet everywhere. It gave us
so much freedom! However, it's also gave us new problems to solve. One of them is how we present content on the different 
screens. In the early days, websites would have separate versions for mobile and desktops. Then responsive design came into
play, so we could have one codebase with adaptive layout. One of the thing that you do need to look at is how you 
display your images across the devices. Given you have one website, but you don't want to load a big image that used
on the desktop into mobile device with a tiny screen. That's how we got srcset attribute on image tag and seperate 
picture tag in HTML standard. We can now provide the same image in the different sizes and a browser will pick the right
version.

But, that's not the end of the story with the different screens. In addition to different size they also have another
characteristic called DPI.

Throughout the article, we will use photo of this gorgeous cheetah just to remind us how quick we'd like our images to load.

TODO: Insert image
Photo by <a href="https://unsplash.com/@ahmadgalal?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Ahmed Galal</a> on <a href="https://unsplash.com/s/photos/cheetah?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## What is DPI 

DPI stands for Dots Per Inch and in the past the term was mostly used for devices that transforms digital images to paper 
and vice versa. Two most popular examples are scanners and printers. So there was nothing for the Web to worry about.

However, in 2010 Apple released a new IPhone 4 with "Retina" display. The main goal of that display was to make a screen closer
to photo and remove pixelation. The image from Wikipedia below explains it better than any words

TODO: add images of retina and non retina displays.

Examples from the popular devices

TODO: Maybe some more examples

## Support of DPI in HTML

The two standard ways of accommodating your HTML markup for high DPI screens is to use <img> tag with `srcset` attribute.

The first option is to use DPI descriptor when specifying URL:

```
<img srcset="
    cheetah.jpg,
    cheetah-2x.jpg 2x,
    cheetah-3x.jpg 3x,
"
    src="cheetah.jpg"
    alt="Cheetah"/>
```

In the example above the image will have the same screen size on all devices, however a browser will pick the one closest to 
the screen's DPI.

But what if we need an image to have different size on different screens. Let's say 200px on mobile and 400px on the desktop.
In that case we would need to go with width descriptor in `srcset` attribute:

```html
<img srcset="
        cheetah-200w.jpg 200w,
        cheetah-400w.jpg 400w,
        cheetah-400w.jpg 500w,
        cheetah-600w.jpg 600w,
        cheetah-800w.jpg 800w,
        cheetah-800w.jpg 1000w,
        cheetah-1200w.jpg 1200w,
    "
     src="cheetah.jpg"
     sizes="
        (max-width: 768px) 100vw,
        400px
    "
     alt="Cheetah"/>
```

That's where browsers will do the magic! Based on the visible image size, display characteristics, and other factors the image
to download will be chosen.

If we open Chrome web browser and select Samsung XX (TODO) then we will see that the browser will load 600 pixels version
due to the screen having 3 dppx.

Now, let's have a look at sizes of the image

* 1x - 240 Kb
* 3x - 800 Kb

So, when we load an image on the display with higher DPI the size of the image will grow as well. This become critical
when we understand that high DPI display are often mobile devices where network might not as good as home broadband.

Can we do anything to make images load faster in that case?

## Deliver smaller images for High DPI screens

Yes, we can!

When we are talking about images, sizes, and used bandwidth the one important thing to understand is what happens
when we show the bigger image (900px) in the smaller physical space (300 screen pixels). The quality is getting better
(see the example from the intro). However, when we are considering photos the humans eye can only see that much details. 
Therefore we can use more aggressive compression for display with higher DPIs. Let's look at our example, but use lower 
quality for 3x version:

TODO:

Now, 3x version is 350Kb which is still bigger than 1x but 30% lighter than original version.

Now we know what we'd like to achieve:

Load the bigger version of the image on high DPI displays, but use lower quality. Unfortunately, currently that's not 
possible to implement with `<img>` tag. It comes down to the fact that we can't mix `w` and `x` descriptors. Otherwise,
we could do something like `https://website.com/images/logo-800w-2x.png 800w 2x` in the `srcset` attribute to give a browser
a hint of what image to load.

What we can do though is to use `<picture>` tag with media selectors. There is a [`resolution` CSS media selector](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution) 
that could be used for that. But, nothing is easy and Safari still doesn't support it :( Nevertheless, there is similar 
[`-webkit-device-pixel-ratio` selector](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/-webkit-device-pixel-ratio)
that supported everywhere. So, let's have a look how we can combine that one with `srcset` attribute:

```html
    <picture>
      <source
          media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
          srcset="
                /cdn/http://webserver/img/parrot.jpg/resize?size=300&dppx=2 300w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=400&dppx=2 400w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=500&dppx=2 500w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=600&dppx=2 600w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=1200&dppx=2 1200w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=1800&dppx=2 1800w,
                /cdn/http://webserver/img/parrot.jpg/optimise?dppx=2 2400w"
          sizes="(min-width: 768px) 600px, 100vw"
      >
      <source
          media="(-webkit-min-device-pixel-ratio: 3)"
          srcset="
                /cdn/http://webserver/img/parrot.jpg/resize?size=300&dppx=3 300w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=400&dppx=3 400w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=500&dppx=3 500w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=600&dppx=3 600w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=1200&dppx=3 1200w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=1800&dppx=3 1800w,
                /cdn/http://webserver/img/parrot.jpg/optimise?dppx=3 2400w"
          sizes="(min-width: 768px) 600px, 100vw"
      >
      <img
          src="/cdn/http://webserver/img/parrot.jpg/optimise"
          srcset="
                /cdn/http://webserver/img/parrot.jpg/resize?size=300 300w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=400 400w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=500 500w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=600 600w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=1200 1200w,
                /cdn/http://webserver/img/parrot.jpg/resize?size=1800 1800w,
                /cdn/http://webserver/img/parrot.jpg/optimise 2400w"
          alt="image"
          sizes="(min-width: 768px) 600px, 100vw"
          class="mobile-100"
      >
    </picture>
```

Now, that looks better, as we load lower quality image for screens with DPI 2 to 3 and even lower quality from 3 onwards 

However, I wouldn't recommend using this example in the production because it's not leveraging [the next generation](https://pixboost.com/blog/next-gen-avif-format/) like WebP and AVIF.

```
TODO: <picture tag with type="image/jpeg" type="image/avif"
```

And here it is! The snippet that will give us the best mix of quality and performance. It's also worth mentioining that 
it's 0 (zero!) javascript involved. 

On the downside we would need to prepare 63 variants of the source image. And that's where Image CDN can help you!

## New ?dppx option in Pixboost API



?dppx query option and why not client hints

## Conclusion