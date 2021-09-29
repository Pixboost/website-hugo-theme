---
title: "Why Pixboost Is the Best Image Cdn"
description: "Pixboost is an Image CDN and there are few others on the market. We think we are doing the best product with the strong differentiation points. In this article we cover why we think so."
date: 2021-05-24T13:01:55Z
draft: false
image: winner.jpg
v2: true
---

When it comes to web projects, it is crucial for the final result to be top-notch in the aspect of speed. Images make up one of the areas that can have a significant effect on how fast a website loads. However, fine-tuning this area is a little more complex than merely adjusting image sizes.

It involves applying different technologies to make marginal gains in how images in web projects are delivered to the end user. Image CDNs have emerged as one of the go-to technologies in solving image optimization and delivery issues. In that regard, we are going to explain our philosophy and what sets it apart from those of other similar tools.

We shall also go into detail about value in our SaaS offering and what makes it better than others on the market.


## Transformimgs Open Source Image CDN

Transformimgs is an open source image transformation service that could be easily deployed behind Content Delivery Network and serve responsive images.

It is the heart of Pixboost and we think making it Open Source has many advantages. You could find the [project on Github here](https://github.com/Pixboost/transformimgs).

### An images service built for web

Our main focus is to build an images service that covers the needs of a typical web project that gets loaded on different browsers. This web project would also be the kind loaded by people from numerous locations on different devices and varying network quality.

Being web-first allows us to make some decisions like supporting formats that browsers support. It also means we could decide not to support a feature that is not widely adopted, such as client hints.

Targeting the web also enables us to eliminate some features that we think should be done by other tools. For example, making an image round should be done by CSS and not by an API.

### Opinionated API or simple is power

{{< full-width-image image="API.jpg" alt="Image API" >}}

Our API has just four endpoints, and you don't have much choice when using them. This is done intentionally and opens a few doors for us such as:

* Maintaining API compatibility is easier. By not having thousands of options, we do not have to worry about backward compatibility meaning the users don't need to look out for deprecated options and update their integration.

*  Making algorithms smarter behind the scenes. For instance, you can't specify the output format. Instead, we determine the best possible format behind the scenes and go with that. Some good examples would be AVIF and images with text. We found that on those images, AVIF might generate some visible artifacts, so it's better to use WebP for such images. 

*  Less code also means that you reduce the chances of encountering bugs.

We don't say that we will never add more operations, but we'd like them to fit very well into our web-first strategy. For example, we don't think that watermarks are a key part of the user experience for product images in an online shop, so we wouldn't add watermarking to the service.

### Minimal configuration

{{< full-width-image image="config.jpg" alt="Configuration options" >}}

This choice is made in the same spirit with the previous point, but it manifests differently. We still don't have a configuration file, meaning that you can only change behavior using command line flags. We will try to keep it that way for as long as possible.

It’s worth noting that some projects don't support next generation formats, like WebP or AVIF in the default configuration. In our case, we do support them, and you can't turn them off.

### Container-Optimized runtime

We chose to use Go because you could compile it and get a lightweight, statically-linked executable that could be easily moved around. We provide a docker image and that is the best way to deploy the service into the environment.

Containers have pretty much become a default runtime nowadays, so you could easily deploy an images service on all popular clouds and manage infra by yourself - the cost is usually lower, setup and service are more complex, or use server-less offerings - the running cost is higher, but managing is negligible.

### CDN optimised

Since we have an opinion on nearly everything regarding images for web projects, we also think you are better off deploying the image API behind a Content Delivery Network. Transformimgs supports Accept and Vary HTTP headers to serve images in the next generation formats and taking advantage of the Save-Data client hint.

Given that assumption, we could also streamline design decisions which makes the service implementation simpler and minimizes the risk of any issues.

## Pixboost SaaS offering

Pixboost is a SaaS offering on top of the transformimgs service which brings all the above benefits and adds more. Let's take a closer look at its benefits.

### SaaS

For starters, since Pixboost is a Saas, it comes with a lot of the typical benefits of SaaS such as.

Just quickly reiterate what benefits SaaS have.

*  We take care of all updates and security. This means that you don’t have to worry about your tools being out-of-date or vulnerable to new kinds of breaches. By extensively monitoring the way different customers use Pixboost, we are able to advance it based on what we learn about the users’ greatest desires.

* We make sure the service runs 24/7, while also offering Service-Level Agreement (SLA). Many web projects start off on different scales, and their demands grow as time goes by. So for the smaller projects in particular, it is important to have a solution where there’s more flexibility in terms of what the provider will offer and subsequently, what it will cost the customer.

* We have a very thorough testing plan and before releasing a new version we go through hundreds of images and see if the main metrics are only improving.

*  Image optimization is quite CPU-intensive, so it can be very expensive to run effectively. However, we have managed to make it as lean as possible, meaning we can offer a reasonable price for our service.

* We provide a very user-friendly experience through a simplified dashboard. We also enable in-depth analytics and reporting by providing the latest statistics and usage information. 

{{< signup >}}

### CDN Included

{{< full-width-image image="cdn-locations.png" alt="Content delivery network locations" >}}


We included CDN in our offering, and we took our time to pick the best one. Currently, we use Google CDN, and these are the reasons why:

*  It has HTTP/3 support. Google was one of the initiators of the standard and among the first to add it to their Content Delivery Network.

* Google is the company that actually takes care of the network end-to-end. They lay cables down in the ocean, take fibre all the way to your house and make the most popular browser. Therefore, we feel that they can be trusted since they do a lot to develop this ecosystem.

* They have more than 100 points of presence, so you can make sure the images will be fairly close to your users regardless of where they are loading the website from.

* Google is always one of the leaders when it comes to latency benchmarks for CDNs. We constantly compare its performance to competitors, and have a clear plan of how to migrate Pixboost to a different CDN if necessary. So, if there’s a better option, then we'll switch to it to consistently provide our customers with the best available option.

### Tools and libraries

In addition to the API that you can easily use in your HTML markup, we also provide JS and React libraries, which come with features like lazy loading out-of-the-box. 

On the other side of content delivery, we also have a Snippet Generator tool that helps content managers to put optimise images on the landing pages and articles.


{{< full-width-image image="snippet-generator-tool.png" alt="Snippet Generator Tool" >}}

### End 2 End solution

Because we provide an end-to-end solution including tools, libraries and a CDN, we're also covering some of the edge cases like cache invalidation and warmup, that could be integrated into a more complex workflow. You could find the example of cache invalidation on a workflow for AWS S3 integration [here](https://github.com/Pixboost/aws-s3-invalidate-cdn).

### Simple pricing

With Pixboost, you only pay for the weight of the images that have been delivered to your users. That's really it. So, it's pay for what you use. What may also surprise you is that if you serve the same number of images continuously, it becomes cheaper for you because we improve the algorithms that make images smaller.

For instance, when we introduced AVIF format, some of our clients started paying up to 30% less than before.

You pay only for weight of the images that been delivered to your users. That's really it. So, it's pay for what you use.

What also would surprise you is if you serve the same number of images it becomes cheaper for you cause we improve the algorithms that make images smaller. For instance, when we [introduced AVIF format](/blog/next-gen-avif-format/) some of our clients started paying by up to 30% less than before.

### Open Source

At Pixboost, we try to make everything Open Source; image processing API, libraries, website, etc. We are true believers in Open Source and think that it's the best business model for IT projects out there. 

Here are some of the main reasons why we think open source is better:

* Quality is better. Since the source code is published to the whole world, it's essential to have clean and well-documented code.

*  The large community surrounding your project really helps a lot with everything. You get to detect issues much quicker, you can brainstorm different approaches to solving problems and also get extra assistance with your product roadmap.

* We think that the Internet is more than just a large source of information. Some of the essential activities like shopping, issuing passports or booking a doctor appointment are done over the Internet. Open Source helps to make everything more transparent, so we can make sure that there is no fraud or secrecy in the code.

### Customer Support

It’s extremely important to be able to receive help in case anything goes wrong with the images in your web project. At Pixboost, not only do we do 24/7 monitoring, we also have a quick turnaround, with the ability to solve issues in as low as one hour.

It all depends on the nature of the issue, and your chosen pricing plan.

{{< signup >}}

## Conclusion

Ultimately, Pixboost is a formidable solution for various reasons. Firstly, it lets you not have to worry about every little setting. It is designed to be simple and do as much on its own as possible.

Secondly, Pixboost captures the best of two different worlds. It comes as a SaaS offering, which means that you have someone dedicated to offering help in case of any troubles. However, help is not limited to the team you pay.

You can opt for the open source version and benefit from both the other members of the general public that contribute, and the consultants from Pixboost who can help you customize the solution according to your project’s unique needs.

Thirdly, Pixboost does more than just solving image optimization issues. It gives you greater liberty over how you work, from details like managing API keys, to alternating between different automated API workflow call capacities and bandwidth packages.

Depending on your traffic levels, you may also be eligible for discounts. Keep in mind that for as long as Pixboost improves at image compression faster than your usage levels, it remains progressively cheaper.

Lastly, it is always wise to select such tools with the growth of your web project in mind. You’re better off with a tool that maintains its quality as user location and browsers vary, and Pixboost excels at that.