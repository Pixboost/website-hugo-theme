---
title: "Ai Images for Ecommerce"
date: 2024-07-07T21:11:17Z
draft: true
---

Generative AI has exploded in popularity over recent years, finding its way into almost every aspect of our digital lives. Here at Pixboost, we’ve been watching the trend closely, experimenting with how Large Language Models (LLMs) and Image Generation models can be practically applied to an Image CDN.

Today, we are excited to walk you through the first GenAI API feature we are launching. We’d love to hear your feedback and thoughts as we refine this technology.

TLDR:

You can now add a prompt query parameter to your API calls to instantly modify the background of your images using AI.

* The Offer: Every customer gets 100 AI credits (100 unique prompts) per month for free during the Beta.
* The Status: This API is currently in Beta and subject to change based on your feedback.

## GenAI and Image CDN: Finding the Balance

Running and hosting Generative AI models is computationally expensive. However, the results they produce are incredibly powerful. Our main consideration during development was finding the "sweet spot"—how do we make this technology affordable while delivering high-quality results?

Image models function differently than text-based LLMs. The infrastructure required to process pixels is heavy. By integrating this directly into the Pixboost Image CDN, we handle the heavy lifting. This allows you to leverage enterprise-grade AI image manipulation without managing your own GPU clusters or worrying about complex infrastructure.

## How GenAI Helps eCommerce

Why should an e-commerce store care about AI-generated backgrounds?

* Contextual Selling: A plain white background is great for a catalogue, but it doesn't create an emotional connection. AI allows you to place a hiking boot on a "rocky mountain trail" or a coffee mug on a "cozy wooden table," helping the customer visualize the product in their life.
* Cost Efficiency: Running a photoshoot for every product in different settings is time-consuming and expensive. GenAI creates these settings virtually for a fraction of the cost.
* A/B Testing: You can test different backgrounds to see which converts better. Does your summer dress sell better on a "beach background" or a "garden party background"? You can now find out without a reshoot.
* Seasonal Agility: Instantly update your store for holidays. Turn a standard product image into a Christmas or Halloween-themed asset simply by changing the query string.

## Feature: Background In-paint using Pixboost API

In e-commerce, product images usually have a plain background. This works best when visitors want to inspect product details. However, plain backgrounds don't do the best job of showcasing the product in use.

We created an API that allows you to generate any background you want for your product images instantly. It's incredibly simple: all you need to do is add the ?prompt query parameter to your image URLs.

### See it in action

Below are examples of raw product photos transformed by the Pixboost API.

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

## How to Prompt Effectively

To get the best results, treat the prompt as a description of the scene you want to build around your object.

Recommended: Plainly describe the scene and the atmosphere.

Example: "A marble kitchen counter with morning sunlight."

Not Recommended: Avoid instructive language or negative constraints.

Avoid: "Make the background a kitchen" or "Don't show any people."

### Prompting Framework

When writing your prompt text, consider defining these four elements:

1. The Surface/Background: (e.g., a wooden table, a rocky cliff, a silk sheet)
2. Lighting: (e.g., soft cinematic lighting, bright noon sun, neon lights)
3. Perspective: (e.g., macro shot, wide angle)
4. Mood: (e.g., cozy, industrial, luxury)

Example:

If you are selling a Bottle of Perfume:

Weak Prompt: "Flowers."

Strong Prompt: "Standing on a glass podium, surrounded by pink cherry blossoms, soft pastel bokeh background, high-end product photography."

## Pricing

At the moment, the API is in Beta. It is free to use for up to 100 unique prompts per month.

## Conclusion

Adding GenAI capabilities to an Image CDN adds immense value to e-commerce workflows. It bridges the gap between high-performance delivery and creative content generation.

We can't wait to take the next steps in this direction and release more features to help you sell more. Please give the ?prompt parameter a try and let us know what you think!