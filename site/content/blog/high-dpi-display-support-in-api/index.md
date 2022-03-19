---
title: "High DPI Display Support in API"
date: 2022-03-15T19:49:31Z
draft: true
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

## What is DPI 

DPI stands for Dots Per Inch and in the past the term was mostly used for devices that transforms digital images to paper 
and vice versa. Two most popular examples are scanners and printers. So there was nothing for the Web to worry about.

However, in 2010 Apple released a new IPhone 4 with "Retina" display. The main goal of that display was to make a screen closer
to photo and remove pixelation. The image from Wikipedia below explains it better than any words

TODO: add images of retina and non retina displays.

Examples from the popular devices

## Support of DPI in HTML

<img> tag with 2x srcset. What is limitations and the problem

## Deliver smaller images for High DPI screens

Introduction into <picture> and how to it can help to solve the problem 

## Adding next generation formats

Add webp/AVIF support to the <picture> tag 

List all variants of the images to prepare

## New ?dppx option in Pixboost API

?dppx query option and why not client hints

## Conclusion