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

In the example above the image will have the same screen size on all devices, however a browser will pick the one that match user's screen DPI.

But what if we need an image to have different size on different screens. Let's say full width on mobile and 400px on the desktop.
In that case we would need to go with width descriptor in `srcset` attribute:

```html
<img srcset="
        cheetah-400w.jpg 400w,
        cheetah-500w.jpg 500w,
        cheetah-600w.jpg 600w,
        cheetah-800w.jpg 800w,
        cheetah-1000w.jpg 1000w,
        cheetah-1200w.jpg 1200w,
        cheetah-1500w.jpg 1500w,
        cheetah-1800w.jpg 1800w,
    "
     src="cheetah.jpg"
     sizes="
        (max-width: 768px) 100vw,
        400px
    "
     alt="Cheetah"
/>
```

Note how many sizes we included - that's because mobile devices are different not only in size but in DPI as well. 
So, for 400 pixels wide screen we would need to have 3 images - 400, 800, 1200 pixels. A browsers will do the magic and based on the visible image size, display characteristics, and other factors will pick the most appropriate image.

By the way, picking the sizes for srcset is quite a riddle. On the one hand, you could look up devices or screen sizes in your
analytics and target directly them. For instance, IPhone 12 is 390 pixels wide, Pixel 5 - 393, IPhone SE - 375, and so on. However,
there are couple of drawbacks in that case. Firstly, you would need to update sizes everytime new popular device released which 
quite a bit of hustle. Secondly, having too many variants could decrease your CDN cache hit ratio, and you won't be leveraging full
power of network edges. So, rather than going with specific devices we recommend sticking with ranges like 400, 500, 600 pixels. 

If we open Chrome web browser with Developer console and select Samsung IPhone 12 Pro  then we will see that the browser will load 1200 pixels version
due to the screen DPI equals 3. If we change the device to IPhone SE then the browser will prefer 800 pixels version.

{{< rawhtml >}}
<video src="devices-dpi.webm" autoplay mute controls></video>
{{< /rawhtml >}}

Now, let's have a look at sizes of the images loaded for 1, 2, and 3 DPI:

* cheetah-400w.jpg - 42 Kb
* cheetah-800w.jpg - 141 Kb
* cheetah-1200w.jpg - 298 Kb

So, when we load an image on the display with higher DPI the size of the image will grow as well. This become critical
when we understand that high DPI display are often mobile devices where network might be not as good as a home broadband.

Can we do anything to make images load faster in that case?

## Deliver smaller images for High DPI screens

Yes, we can!

When we are talking about images, sizes, and used bandwidth the one important thing to understand is what happens
when we show the bigger image (1200px) into the smaller physical screen (400 screen pixels). The quality is getting better
(see the example from the intro). However, when we are considering photos the humans eye can only see that much details. 
Therefore, we can use more aggressive compression for displays with higher DPIs. 

So, let's encode our 3x variant with lower quality:

Now, 3x version is 154KbKb which is still bigger than 1x but twice as smaller than original version.



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
            q50/cheetah-400w.jpg 400w,
            q50/cheetah-500w.jpg 500w,
            q50/cheetah-600w.jpg 600w,
            q50/cheetah-800w.jpg 800w,
            q50/cheetah-1000w.jpg 1000w,
            q50/cheetah-1200w.jpg 1200w,
            q50/cheetah-1500w.jpg 1500w,
            q50/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
            q40/cheetah-400w.jpg 400w,
            q40/cheetah-500w.jpg 500w,
            q40/cheetah-600w.jpg 600w,
            q40/cheetah-800w.jpg 800w,
            q40/cheetah-1000w.jpg 1000w,
            q40/cheetah-1200w.jpg 1200w,
            q40/cheetah-1500w.jpg 1500w,
            q40/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <img
      src="cheetah.jpg"
      srcset="
            cheetah-400w.jpg 400w,
            cheetah-500w.jpg 500w,
            cheetah-600w.jpg 600w,
            cheetah-800w.jpg 800w,
            cheetah-1000w.jpg 1000w,
            cheetah-1200w.jpg 1200w,
            cheetah-1500w.jpg 1500w,
            cheetah-1800w.jpg 1800w
          "
      alt="Cheetah"
      sizes="(max-width: 768px) 100vw, 400px"
  >
</picture>
```

Now, that looks better, as we load lower quality image for screens with DPI 2 to 3 and even lower quality from 3 onwards 

However, I wouldn't recommend using this example in the production because it's not leveraging [the next generation](https://pixboost.com/blog/next-gen-avif-format/) like WebP and AVIF.

To add next-gen formats to the mix we do need to use `type` attribute of `<source>` tag and add a separate source for every format. It's important to remember that first source that browser can load will be used, so we should start with AVIF, then goes Webp and JPEG should be last.

```html
<picture>
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      type="image/avif"
      srcset="
            q50-avif/cheetah-400w.avif 400w,
            q50-avif/cheetah-500w.avif 500w,
            q50-avif/cheetah-600w.avif 600w,
            q50-avif/cheetah-800w.avif 800w,
            q50-avif/cheetah-1000w.avif 1000w,
            q50-avif/cheetah-1200w.avif 1200w,
            q50-avif/cheetah-1500w.avif 1500w,
            q50-avif/cheetah-1800w.avif 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      type="image/webp"
      srcset="
            q50-webp/cheetah-400w.webp 400w,
            q50-webp/cheetah-500w.webp 500w,
            q50-webp/cheetah-600w.webp 600w,
            q50-webp/cheetah-800w.webp 800w,
            q50-webp/cheetah-1000w.webp 1000w,
            q50-webp/cheetah-1200w.webp 1200w,
            q50-webp/cheetah-1500w.webp 1500w,
            q50-webp/cheetah-1800w.webp 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcset="
            q50/cheetah-400w.jpg 400w,
            q50/cheetah-500w.jpg 500w,
            q50/cheetah-600w.jpg 600w,
            q50/cheetah-800w.jpg 800w,
            q50/cheetah-1000w.jpg 1000w,
            q50/cheetah-1200w.jpg 1200w,
            q50/cheetah-1500w.jpg 1500w,
            q50/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      type="image/avif"
      srcset="
            q40-avif/cheetah-400w.avif 400w,
            q40-avif/cheetah-500w.avif 500w,
            q40-avif/cheetah-600w.avif 600w,
            q40-avif/cheetah-800w.avif 800w,
            q40-avif/cheetah-1000w.avif 1000w,
            q40-avif/cheetah-1200w.avif 1200w,
            q40-avif/cheetah-1500w.avif 1500w,
            q40-avif/cheetah-1800w.avif 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      type="image/webp"
      srcset="
            q40-webp/cheetah-400w.webp 400w,
            q40-webp/cheetah-500w.webp 500w,
            q40-webp/cheetah-600w.webp 600w,
            q40-webp/cheetah-800w.webp 800w,
            q40-webp/cheetah-1000w.webp 1000w,
            q40-webp/cheetah-1200w.webp 1200w,
            q40-webp/cheetah-1500w.webp 1500w,
            q40-webp/cheetah-1800w.webp 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
            q40/cheetah-400w.jpg 400w,
            q40/cheetah-500w.jpg 500w,
            q40/cheetah-600w.jpg 600w,
            q40/cheetah-800w.jpg 800w,
            q40/cheetah-1000w.jpg 1000w,
            q40/cheetah-1200w.jpg 1200w,
            q40/cheetah-1500w.jpg 1500w,
            q40/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <img
      src="cheetah.jpg"
      srcset="
            cheetah-400w.jpg 400w,
            cheetah-500w.jpg 500w,
            cheetah-600w.jpg 600w,
            cheetah-800w.jpg 800w,
            cheetah-1000w.jpg 1000w,
            cheetah-1200w.jpg 1500w,
            cheetah-1200w.jpg 1800w
          "
      alt="Cheetah"
      sizes="(max-width: 768px) 100vw, 400px"
  >
</picture>
```

And here it is! The snippet that will give us the best mix of quality and performance. It's also worth mentioning that it's 0 (zero!) javascript involved. 

On the downside we would need to prepare 48 variants of the source image. And that's where Image CDN can help you!

## Reducing number of source images using Image CDN

Now, let's see how Pixboost can help us to produce all the variants using Image Processing API. To start you would need to create a free account at [pixboost.com](TODO), once you login first time you'd need to add a new image source like on the video below.

{{< rawhtml >}}
<video src="add-source-domain.webm" autoplay mute controls></video>
{{< /rawhtml >}}

And now you can use `/resize` API to produce all needed sizes and next-generation formats.

```html
<img srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&auth=MTI0MjkwMTgzMA__ 1800w
    "
     src="cheetah.jpg"
     sizes="
        (max-width: 768px) 100vw,
        400px
    "
     alt="Cheetah"
/>
```

The above code will cater for different sizes and also next-generation formats by using `Accept` header. A browser will send 
list of supported formats to the API and Pixboost will pick the best one to use.

So, now the only missing part is adding additional compression on screens with DPI `>= 2`. And we finally got to our new
API feature - `?dppx` query parameter! 

## Support of high DPI screens in API

We introduced a new `?dppx` hint for passing screen DPI to the API, so we can do optimisations based on its value. Having
a `?dppx` and not a direct `quality` gives us a lot of room to add additional enhancements, and we believe the end-user
doesn't need access to those cause otherwise it becomes harder to support in the long run. The most recent example is `AVIF`
format that has been introduced last year. We could use much higher compression with it keeping the same level of visual 
perception. We could also use different quality and types of compression for different type of images, e.g. photos, illustrations.

To introduce support of `?dppx` into our `HTML` code we still need to use `<picture>` tag with media queries, but as with
`<img>` example we don't need to specify separate `<source>` for next-generation formats.

```html
<picture>
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&dppx=2&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&dppx=2&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&dppx=2&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&dppx=2&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&dppx=2&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&dppx=2&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&dppx=2&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&dppx=2&auth=MTI0MjkwMTgzMA__ 1800w
      "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&dppx=3&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&dppx=3&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&dppx=3&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&dppx=3&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&dppx=3&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&dppx=3&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&dppx=3&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&dppx=3&auth=MTI0MjkwMTgzMA__ 1800w
      "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <img
      src="cheetah.jpg"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&auth=MTI0MjkwMTgzMA__ 1800w
      "
      alt="Cheetah"
      sizes="(max-width: 768px) 100vw, 400px"
  >
</picture>
```

And now we have the perfect snippet to show responsive images on the website, hooray!!! 

TODO: Client hints

## Conclusion

The Web changed a lot once we could use our phones, tablets, fridges to access the Internet. To deliver images with higher 
visual fidelity we need to support screens with DPI > 2. However, o make the Internet accessible 
place we'd need cater for people with not-so-fast Internet and only send data they needed. 

Using higher compression on High DPI screens enable us to achieve both goals!

Using Image CDN gives some practical long-term benefits:

* Making your processes more lightweight when storing only one source image
* Making markup cleaner without need to add a separate source for the next-gen formats
* Makes your image delivery future-proof with automatic support of the new formats and features 
* 

## Examples

{{< rawhtml >}}
<script type="text/javascript">
function showImageSource(event, outputId, includeFolder) {
    const currentSrc = event.target.currentSrc;
    const el = document.getElementById(outputId);
    
    if (includeFolder) {
        const pathElements = currentSrc.split('/');
        el.innerHTML = pathElements[pathElements.length - 2] + '/' + pathElements[pathElements.length - 1];
    } else {
        el.innerHTML = currentSrc.substring(currentSrc.lastIndexOf('/') + 1);
    }
}
</script>
{{< /rawhtml >}}

### Using DPI descriptor

```html
<img srcset="
    cheetah.jpg,
    cheetah-2x.jpg 2x,
    cheetah-3x.jpg 3x,
"
    src="cheetah.jpg"
    alt="Cheetah"/>
```

{{< rawhtml >}}
<img srcset="
    cheetah.jpg,
    cheetah-2x.jpg 2x,
    cheetah-3x.jpg 3x,
"
    src="cheetah.jpg"
    alt="Cheetah"
    onload="showImageSource(event, 'example-dpi-descriptor')"
/>

<p>
    Source: <span id="example-dpi-descriptor"></span>
</p>

{{< /rawhtml >}}

### Using width descriptors

```html
<img srcset="
        cheetah-400w.jpg 400w,
        cheetah-500w.jpg 500w,
        cheetah-600w.jpg 600w,
        cheetah-800w.jpg 800w,
        cheetah-1000w.jpg 1000w,
        cheetah-1200w.jpg 1200w,
        cheetah-1500w.jpg 1500w,
        cheetah-1800w.jpg 1800w,
    "
     src="cheetah.jpg"
     sizes="
        (max-width: 768px) 100vw,
        400px
    "
     alt="Cheetah"
/>
```

{{< rawhtml >}}
<img srcset="
        cheetah-400w.jpg 400w,
        cheetah-500w.jpg 500w,
        cheetah-600w.jpg 600w,
        cheetah-800w.jpg 800w,
        cheetah-1000w.jpg 1000w,
        cheetah-1200w.jpg 1200w,
        cheetah-1500w.jpg 1500w,
        cheetah-1800w.jpg 1800w
    "
     src="cheetah.jpg"
     sizes="
        (max-width: 768px) 100vw,
        400px
    "
     alt="Cheetah"
    onload="showImageSource(event, 'example-width-descriptor')"
/>
<p>
    Source: <span id="example-width-descriptor"></span>
</p>
{{< /rawhtml >}}

### Picture tag

```html
<picture>
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcset="
            q50/cheetah-400w.jpg 400w,
            q50/cheetah-500w.jpg 500w,
            q50/cheetah-600w.jpg 600w,
            q50/cheetah-800w.jpg 800w,
            q50/cheetah-1000w.jpg 1000w,
            q50/cheetah-1200w.jpg 1200w,
            q50/cheetah-1500w.jpg 1500w,
            q50/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
            q40/cheetah-400w.jpg 400w,
            q40/cheetah-500w.jpg 500w,
            q40/cheetah-600w.jpg 600w,
            q40/cheetah-800w.jpg 800w,
            q40/cheetah-1000w.jpg 1000w,
            q40/cheetah-1200w.jpg 1200w,
            q40/cheetah-1500w.jpg 1500w,
            q40/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <img
      src="cheetah.jpg"
      srcset="
            cheetah-400w.jpg 400w,
            cheetah-500w.jpg 500w,
            cheetah-600w.jpg 600w,
            cheetah-800w.jpg 800w,
            cheetah-1000w.jpg 1000w,
            cheetah-1200w.jpg 1200w,
            cheetah-1500w.jpg 1500w,
            cheetah-1800w.jpg 1800w
          "
      alt="Cheetah"
      sizes="(max-width: 768px) 100vw, 400px"
  >
</picture>
```

{{< rawhtml >}}
<picture>
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcset="
            q50/cheetah-400w.jpg 400w,
            q50/cheetah-500w.jpg 500w,
            q50/cheetah-600w.jpg 600w,
            q50/cheetah-800w.jpg 800w,
            q50/cheetah-1000w.jpg 1000w,
            q50/cheetah-1200w.jpg 1200w,
            q50/cheetah-1500w.jpg 1500w,
            q50/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
            q40/cheetah-400w.jpg 400w,
            q40/cheetah-500w.jpg 500w,
            q40/cheetah-600w.jpg 600w,
            q40/cheetah-800w.jpg 800w,
            q40/cheetah-1000w.jpg 1000w,
            q40/cheetah-1200w.jpg 1200w,
            q40/cheetah-1500w.jpg 1500w,
            q40/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <img
      src="cheetah.jpg"
      srcset="
            cheetah-400w.jpg 400w,
            cheetah-500w.jpg 500w,
            cheetah-600w.jpg 600w,
            cheetah-800w.jpg 800w,
            cheetah-1000w.jpg 1000w,
            cheetah-1200w.jpg 1200w,
            cheetah-1500w.jpg 1500w,
            cheetah-1800w.jpg 1800w
          "
      alt="Cheetah"
      sizes="(max-width: 768px) 100vw, 400px"
      onload="showImageSource(event, 'example-picture', true)"
  >
</picture>

<p>
    Source: <span id="example-picture"></span>
</p>
{{< /rawhtml >}}

### Picture with next-gen formats

```html
<picture>
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      type="image/avif"
      srcset="
            q50-avif/cheetah-400w.avif 400w,
            q50-avif/cheetah-500w.avif 500w,
            q50-avif/cheetah-600w.avif 600w,
            q50-avif/cheetah-800w.avif 800w,
            q50-avif/cheetah-1000w.avif 1000w,
            q50-avif/cheetah-1200w.avif 1200w,
            q50-avif/cheetah-1500w.avif 1500w,
            q50-avif/cheetah-1800w.avif 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      type="image/webp"
      srcset="
            q50-webp/cheetah-400w.webp 400w,
            q50-webp/cheetah-500w.webp 500w,
            q50-webp/cheetah-600w.webp 600w,
            q50-webp/cheetah-800w.webp 800w,
            q50-webp/cheetah-1000w.webp 1000w,
            q50-webp/cheetah-1200w.webp 1200w,
            q50-webp/cheetah-1500w.webp 1500w,
            q50-webp/cheetah-1800w.webp 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcset="
            q50/cheetah-400w.jpg 400w,
            q50/cheetah-500w.jpg 500w,
            q50/cheetah-600w.jpg 600w,
            q50/cheetah-800w.jpg 800w,
            q50/cheetah-1000w.jpg 1000w,
            q50/cheetah-1200w.jpg 1200w,
            q50/cheetah-1500w.jpg 1500w,
            q50/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      type="image/avif"
      srcset="
            q40-avif/cheetah-400w.avif 400w,
            q40-avif/cheetah-500w.avif 500w,
            q40-avif/cheetah-600w.avif 600w,
            q40-avif/cheetah-800w.avif 800w,
            q40-avif/cheetah-1000w.avif 1000w,
            q40-avif/cheetah-1200w.avif 1200w,
            q40-avif/cheetah-1500w.avif 1500w,
            q40-avif/cheetah-1800w.avif 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      type="image/webp"
      srcset="
            q40-webp/cheetah-400w.webp 400w,
            q40-webp/cheetah-500w.webp 500w,
            q40-webp/cheetah-600w.webp 600w,
            q40-webp/cheetah-800w.webp 800w,
            q40-webp/cheetah-1000w.webp 1000w,
            q40-webp/cheetah-1200w.webp 1200w,
            q40-webp/cheetah-1500w.webp 1500w,
            q40-webp/cheetah-1800w.webp 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
            q40/cheetah-400w.jpg 400w,
            q40/cheetah-500w.jpg 500w,
            q40/cheetah-600w.jpg 600w,
            q40/cheetah-800w.jpg 800w,
            q40/cheetah-1000w.jpg 1000w,
            q40/cheetah-1200w.jpg 1200w,
            q40/cheetah-1500w.jpg 1500w,
            q40/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <img
      src="cheetah.jpg"
      srcset="
            cheetah-400w.jpg 400w,
            cheetah-500w.jpg 500w,
            cheetah-600w.jpg 600w,
            cheetah-800w.jpg 800w,
            cheetah-1000w.jpg 1000w,
            cheetah-1200w.jpg 1500w,
            cheetah-1200w.jpg 1800w
          "
      alt="Cheetah"
      sizes="(max-width: 768px) 100vw, 400px"
  >
</picture>
```

{{< rawhtml >}}
<picture>
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      type="image/avif"
      srcset="
            q50-avif/cheetah-400w.avif 400w,
            q50-avif/cheetah-500w.avif 500w,
            q50-avif/cheetah-600w.avif 600w,
            q50-avif/cheetah-800w.avif 800w,
            q50-avif/cheetah-1000w.avif 1000w,
            q50-avif/cheetah-1200w.avif 1200w,
            q50-avif/cheetah-1500w.avif 1500w,
            q50-avif/cheetah-1800w.avif 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      type="image/webp"
      srcset="
            q50-webp/cheetah-400w.webp 400w,
            q50-webp/cheetah-500w.webp 500w,
            q50-webp/cheetah-600w.webp 600w,
            q50-webp/cheetah-800w.webp 800w,
            q50-webp/cheetah-1000w.webp 1000w,
            q50-webp/cheetah-1200w.webp 1200w,
            q50-webp/cheetah-1500w.webp 1500w,
            q50-webp/cheetah-1800w.webp 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcset="
            q50/cheetah-400w.jpg 400w,
            q50/cheetah-500w.jpg 500w,
            q50/cheetah-600w.jpg 600w,
            q50/cheetah-800w.jpg 800w,
            q50/cheetah-1000w.jpg 1000w,
            q50/cheetah-1200w.jpg 1200w,
            q50/cheetah-1500w.jpg 1500w,
            q50/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >

  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      type="image/avif"
      srcset="
            q40-avif/cheetah-400w.avif 400w,
            q40-avif/cheetah-500w.avif 500w,
            q40-avif/cheetah-600w.avif 600w,
            q40-avif/cheetah-800w.avif 800w,
            q40-avif/cheetah-1000w.avif 1000w,
            q40-avif/cheetah-1200w.avif 1200w,
            q40-avif/cheetah-1500w.avif 1500w,
            q40-avif/cheetah-1800w.avif 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      type="image/webp"
      srcset="
            q40-webp/cheetah-400w.webp 400w,
            q40-webp/cheetah-500w.webp 500w,
            q40-webp/cheetah-600w.webp 600w,
            q40-webp/cheetah-800w.webp 800w,
            q40-webp/cheetah-1000w.webp 1000w,
            q40-webp/cheetah-1200w.webp 1200w,
            q40-webp/cheetah-1500w.webp 1500w,
            q40-webp/cheetah-1800w.webp 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
            q40/cheetah-400w.jpg 400w,
            q40/cheetah-500w.jpg 500w,
            q40/cheetah-600w.jpg 600w,
            q40/cheetah-800w.jpg 800w,
            q40/cheetah-1000w.jpg 1000w,
            q40/cheetah-1200w.jpg 1200w,
            q40/cheetah-1500w.jpg 1500w,
            q40/cheetah-1800w.jpg 1800w
          "
      sizes="(max-width: 768px) 100vw, 400px"
  >

  <img
      src="cheetah.jpg"
      srcset="
            cheetah-400w.jpg 400w,
            cheetah-500w.jpg 500w,
            cheetah-600w.jpg 600w,
            cheetah-800w.jpg 800w,
            cheetah-1000w.jpg 1000w,
            cheetah-1200w.jpg 1500w,
            cheetah-1200w.jpg 1800w
          "
      alt="Cheetah"
      onload="showImageSource(event, 'example-picture-next-gen', true)"
      sizes="(max-width: 768px) 100vw, 400px"
  >
</picture>

<p>
    Source: <span id="example-picture-next-gen"></span>
</p>
{{< /rawhtml >}}

### Responsive `<img>` using pixboost 

```html
<img srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&auth=MTI0MjkwMTgzMA__ 1800w
    "
     src="cheetah.jpg"
     sizes="
        (max-width: 768px) 100vw,
        400px
    "
     alt="Cheetah"
/>
```

{{< rawhtml >}}
<img srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&auth=MTI0MjkwMTgzMA__ 1800w
    "
     src="cheetah.jpg"
     sizes="
        (max-width: 768px) 100vw,
        400px
    "
     alt="Cheetah"
    onload="showImageSource(event, 'example-pixboost-img', true)"
/>
<p>
    Source: <span id="example-pixboost-img"></span>
</p>
{{< /rawhtml >}}

### Responsive image with DPI support using Pixboost

```html
<picture>
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&dppx=2&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&dppx=2&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&dppx=2&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&dppx=2&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&dppx=2&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&dppx=2&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&dppx=2&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&dppx=2&auth=MTI0MjkwMTgzMA__ 1800w
      "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&dppx=3&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&dppx=3&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&dppx=3&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&dppx=3&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&dppx=3&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&dppx=3&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&dppx=3&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&dppx=3&auth=MTI0MjkwMTgzMA__ 1800w
      "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <img
      src="cheetah.jpg"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&auth=MTI0MjkwMTgzMA__ 1800w
      "
      alt="Cheetah"
      sizes="(max-width: 768px) 100vw, 400px"
  >
</picture>
```

{{< rawhtml >}}
<picture>
  <source
      media="(-webkit-min-device-pixel-ratio: 2) and (-webkit-max-device-pixel-ratio: 2.9999)"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&dppx=2&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&dppx=2&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&dppx=2&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&dppx=2&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&dppx=2&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&dppx=2&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&dppx=2&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&dppx=2&auth=MTI0MjkwMTgzMA__ 1800w
      "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <source
      media="(-webkit-min-device-pixel-ratio: 3)"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&dppx=3&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&dppx=3&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&dppx=3&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&dppx=3&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&dppx=3&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&dppx=3&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&dppx=3&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&dppx=3&auth=MTI0MjkwMTgzMA__ 1800w
      "
      sizes="(max-width: 768px) 100vw, 400px"
  >
  <img
      src="cheetah.jpg"
      srcset="
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=400&auth=MTI0MjkwMTgzMA__ 400w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=500&auth=MTI0MjkwMTgzMA__ 500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=600&auth=MTI0MjkwMTgzMA__ 600w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=800&auth=MTI0MjkwMTgzMA__ 800w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1000&auth=MTI0MjkwMTgzMA__ 1000w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1200&auth=MTI0MjkwMTgzMA__ 1200w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1500&auth=MTI0MjkwMTgzMA__ 1500w,
        https://pixboost.com/api/2/img/http://www.midday.coffee/dppx-demo/cheetah.jpg/resize?size=1800&auth=MTI0MjkwMTgzMA__ 1800w
      "
      alt="Cheetah"
      sizes="(max-width: 768px) 100vw, 400px"
      onload="showImageSource(event, 'example-pixboost-picture', true)"
  >
</picture>

<p>
    Source: <span id="example-pixboost-picture"></span>
</p>

{{< /rawhtml >}}


### Commands to resize

* `magick mogrify -path q50/ -quality 50 cheetah*`
* `magick mogrify -path q40/ -quality 40 cheetah*`
* `magick mogrify -path q40-webp/ -format webp -quality 40 cheetah*`
* `magick mogrify -path q50-webp/ -format webp -quality 50 cheetah*`
* `magick mogrify -path q50-avif/ -format avif -quality 50 cheetah*`
* `magick mogrify -path q40-avif/ -format avif -quality 40 cheetah*`