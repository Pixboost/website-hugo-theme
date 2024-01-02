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

![](./original-with-borders.png)

I put widths of the images on the right and line with gaps between rows on the left. It didn't look right as some logos looks much bigger than their peers in higher tiers! Also, spacing between rows is all over the place.



## Automating using Pixboost API

how to start using and examples

## Conclusion

