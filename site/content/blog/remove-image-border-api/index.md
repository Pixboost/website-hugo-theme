---
title: "Remove Image Border using API"
date: 2024-01-01T20:19:49Z
draft: true
---

In this blog we'll talk about another new feature we added to Pixboost API - removing image borders.

## Why removing image borders

Image borders are edges of the images that have the same color. Turned out sometimes you'd want to remove them. You might now that we are [very careful]() about adding new things into the API as we want to make sure it's easy to use and not overloaded with features.

So, let's start with the use case. We were helping with website setup for the iconic [DDD Melbourne]() conference and what every conference has? Sponsors! So, there is a section on the website that list all the sponsors logos. Those logos are provided by sponsors and we need to lay them out on the page. 

Sponsors are tiered so the idea is to make different tiers having different sizes. And that's what it looked like once we added all the sponsors:

![](./original-logos.png)

I put widths of the images on the right and line with gaps between rows on the left. It didn't look right as some logos looks much bigger than their peers in higher tiers! Also, spacing between rows is all over the place.

The width of all the images is set, so why they some of the images from lower tier look bigger then others from higher tier? The answer is borders! 

Here is the same screenshot but with borders around images:

![](./original-logos-with-borders.png)

Once we saw that the solution was obvious - let's get rid of borders on the images before resizing them.

Doing so manually is boring and not much fun, so we added a new API to do so!

## Automating using Pixboost API

So how do we remove borders? We take the color of the first pixel and assume it's a border color. Then we start checking next pixel and do so till we find the pixel with a different color. We remove all rows and columns of pixels that have only background color in them.

The power of Pixboost API is its simplicity. We make sure that we don't overload it, it's always easy to use, but covers all the use cases needed for Web Development. 

There are 3 endpoints that modify the image:

* optimise - optimising source image
* resize - resizing source image preserving aspect ratio
* fit - resizing source image but fit the result into the given dimension (crop)

We added a new query parameter `?trim-border` for all of the above. When it's specified in the URL the API will remove border from the source image.



## Conclusion


