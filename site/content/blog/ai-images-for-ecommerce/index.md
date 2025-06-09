---
title: "Ai Images for Ecommerce"
date: 2024-07-07T21:11:17Z
draft: true
---

Generative AI went rampant in recent years, becoming very popular and trying itself in every part of our lifes. Here, at Pixboost, we were watching the trend curiously and experimenting Large Language Models and what could be their application in Image CDN.

We'd like to walk you through the first GenAI API we are launching and would love to hear your feedback and thoughts.

TLDR: You can add `prompt` query parameter to API calls and modify background of the images. Every customer has 100 AI credits which equals to 100 unique prompts per month. The API is in beta mode and subject for change!

## GenAI and Image CDN

Running and creating Large Language Models are very expensive, but they are very powerful, so our main considerations were on how to make sure the cost is affordable and value delivered.

Image LLMs are a bit different from text LLM and there was lots of things happening in that space.

Ethics and GenAI (look it up)

## Samples

Chair

Photo by <a href="https://unsplash.com/@ruslanbardash?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ruslan Bardash</a> on <a href="https://unsplash.com/photos/beige-wooden-bar-stool-4kTbAMRAHtQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>


Sunnys 

Photo by <a href="https://unsplash.com/@giorgiotrovato?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Giorgio Trovato</a> on <a href="https://unsplash.com/photos/shallow-focus-photo-of-black-ray-ban-wayfarer-sunglasses-K62u25Jk6vo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>


Camera 

Photo by <a href="https://unsplash.com/@enikoo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">eniko kis</a> on <a href="https://unsplash.com/photos/white-and-black-polaroid-one-step-2-instant-camera-on-white-board-KsLPTsYaqIQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

https://pixboost.com/api/2/img/https://pixboost.com/img/demos/camera.jpg/optimise?auth=Nzg0MDM2MDYx&prompt=matching%20wall%20on%20the%20background%20with%20polaroid%20photos%20of%20fruits%20and%20vegetables

https://pixboost.com/api/2/img/https://pixboost.com/img/demos/camera.jpg/optimise?auth=Nzg0MDM2MDYx&prompt=on%20a%20beach%20with%20a%20sea%20on%20the%20horizon



Runners

Photo by <a href="https://unsplash.com/@dominostudio?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Domino Studio</a> on <a href="https://unsplash.com/photos/unpaired-red-nike-sneaker-164_6wVEHfI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>


https://pixboost.com/api/2/img/https://pixboost.com/img/demos/runners.jpg/optimise?auth=Nzg0MDM2MDYx&prompt=running%20track



## Background in-paint using Pixboost API

In ecommerce, product images would usually have a plain background which is work best when visitors want to look at the product in details. However, they are not doing the best job in showcasing product in-use. Running a photoshoot for every product could be very time-consuming and expensive.

So, we created an API that you can use to generate any background you want for your product images. It's very simple and all you need to do is to add `?prompt` query parameter to your image URLs. 

Let's look at the examples:

The API is still in beta status, and that's a first AI usecase we implemented. We'd love to hear your feedback and thoughts, so we can keep building the best product in the world.

## How Much



## How to prompt

Recommended — Plainly describe the change you would like to see. For example "a blue bucket bag".

Not recommended — Avoid instructive language or words like "no" or "don't". For example, avoid phrases like "make the bag blue" or "don't show walls".

Using the text prompt, describe your target. Consider, for example:

* background (a wooden table)
* mood or lighting (warm, cool, dramatic)
* perspective (top, front, close-up, wide-angle)
* style or feel (artistic, aesthetic, dramatic)

Example:

TODO

## Conclusion

Adding GenAI capability into Image CDN is a good idea and adds value to customer. We can't wait to make next steps in that direction and release more cool features.