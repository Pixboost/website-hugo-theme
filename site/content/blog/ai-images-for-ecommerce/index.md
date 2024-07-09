---
title: "Ai Images for Ecommerce"
date: 2024-07-07T21:11:17Z
draft: true
---

Generative AI went rampant in recent years, becoming very popular and trying itself in every part of our lifes. Here, at Pixboost, we were watching the trend curiously and exeperinmenting Large Language Models and what could be their application in Image CDN.

We'd like to walk you through the first GenAI API we are launching and would love to hear your feedback and thoughts.

TLDR: You can add `prompt` query parameter to API calls and modify background of the images. Every customer has 100 AI credits which equals to 100 unique prompts per month. The API is in beta mode and subject for change!

## GenAI and Image CDN

Running and creating Large Language Models are very expensive, but they are very powerful, so our main considerations were on how to make sure the cost is affordable and value delivered.

Image LLMs are a bit different from text LLM and there was lots of things happening in that space.

Ethics and GenAI (look it up)

## Background in-paint using Pixboost API

In ecommerce, product images would usually have a plain background which is work best when visitors want to look at the product in details. However, they are not doing the best job in showcasing product in-use. Running a photoshoot for every product could be very time-consuming and expensive.

So, we created an API that you can use to generate any background you want for your product images. It's very simple and all you need to do is to add `?prompt` query parameter to your image URLs. 

Let's look at the examples:

The API is still in beta status, so...

## How to prompt

Recommended — Plainly describe the change you would like to see. For example "a blue bucket bag".

Not recommended — Avoid instructive language or words like "no" or "don't". For example, avoid phrases like "make the bag blue" or "don't show walls".

Using the text prompt, describe your target. Consider, for example:

* background (a wooden table)
* mood or lighting (warm, cool, dramatic)
* perspective (top, front, close-up, wide-angle)
* style or feel (artistic, aesthetic, dramatic)

Example:



## Conclusion