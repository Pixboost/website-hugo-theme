---
title: "Using "Save-Data" header to improve UX"
date: 2021-02-17T20:45:01Z
description: "Learn how modern web technologies helps you to load the website faster for users on slow networks"
image: 2021.jpg
draft: true
---

We are happy to announce that Pixboost support "Save-Data" client hint now and to celebrate we decided to write
a blog about it!

The Internet has been created more than XX years ago and was getting faster and faster through the time. Mobile and home
networks are getting new technologies and standards every 2-3 years. We are getting 5G on mobiles and WiFi meshes and fibre to 
a house! However, there are still plenty of cases when the Internet speed could be slow. 

I'm from Australia, and we've got National Broadband Network (NBN) which covered whole continent including rural areas. It 
is a great government initiative especially given there were plenty of old ADSL lines and no Internet in distant places. 
I've just checked my speed, and it shows 54 Mbps, but sometimes it could be not that good especially during peak hours. 
If we talk about mobile networks then you could still experience 3G in places not that far from the cities. 
I'm 20 kms away from Melbourne CBD and still getting 3G time to time in some areas.

To add to the above, the websites we are using now are very different from what we had 10 years ago. They have a lot of 
media content and usually assumes that users have a good network.

In this article I'll show a relatively new feature on the Web called "Save-Data" client hint. We'll go through a quick 
overview of the feature then see how developers can leverage it and how Pixboost Image CDN can make your life easier. 

Let's dive in!

## Save-Data mode

Web community created a special "Save-Data" mode for browsers. This mode could be 
turned on manually in browser's settings or the browser could turn it on automatically for you when you are on the
slow network or there is a connectivity glitch. When the data saver mode is on then all HTTP requests that the browser 
sends will have a special "Save-Data: on" header. The flag is also available in frontend side and can be accessed from 
JavaScript which makes it possible to provide custom experience from both front and back end systems. 
The main intention of the feature is to provide the lightweight version of the page 
when a user have slow Internet connection. So, what it could be?

* Do not load non-critical media content, e.g. we can skip images that 
  doesn't have a big impact on understanding of the content.
* Replace heavy media content with lightweight alternative, e.g replace video with an image.
* Reduce quality of the media content. This could be a good middle ground between showing and not
  showing content at all.

Now when we know what it is let's see how to use it.

## Using Save-Data

Save-data flag is available on the frontend and backend. Below are the examples of 
how we can access the flag from either side.

If we'd want to check in our client-side javascript, then we cause the snippet below:

```javascript
if ("connection" in navigator) {
    if (navigator.connection.saveData === true) {
        // Implement data saving operations here.
    }
}
```

On the backend we need to check if the header `Save-Data` exists, and its value is `on`. Currently, the only 
supported value is `on`, but it might change in the future, so it's important to check not only header existence
but the value as well. Below is a snippet in golang to check on the header:

```go
package main

import "http"

func HttpHandle(resp http.ResponseWriter, req *http.Request) {
    saveData = req.Header.Get("Save-Data")
	if saveData == "on" {
        // Implement data saving operations here.
    }
}

```

So, what can we do with it? One of the popular approaches is to add a special CSS class on your `<body>` element, so then
you can use it in your CSS selectors. For instance, if you use background images then you can pick and choose which one 
you'd like to load:

```css
.image {
    background-image: url("https://pixboost.com/image.png");
}

.save-data .image {
    background-image: url("https://pixboost.com/image-low-quality.png");
}

.not-important-image {
    background-image: url("https://pixboost.com/not-important-image.png");
}

.save-data .not-important-image {
    background-image: none;
}
``` 

If you use server side to generate your markup then you can use HTTP header and return different versions of the
page. But, don't forget to add "Save-Data" into "Vary" response header, so CDNs will know its 2 different versions.

As you could see it's quite easy to start using "Save-Data" header, but you still need to update your code
to do that. If you use existing CMS or platform like Shopify then doing those modifications could be hard or impossible
to do.

Let's see how Pixboost can help to minimize manual intervention?

## Support of Save-Data in Pixboost Image CDN

@Pixboost, we support Save-Data header out of the box, and you don't need to worry about it or do anything extra. 
When data saver mode is on our API is using reduced quality to generate the images, so they are more lightweight and will load faster. 

We'll use this API call in all our examples below: 

Let's see what the image will look like with data saver turned on and off when using 
the API call https://pixboost.com/api/2/img/http://www.midday.coffee/assets/banner.jpg/optimise?auth=MTA0ODU5NDA0NQ__

TODO: Show images side by side with weights

As you could see the image on the left has some small visual artifacts, but we've just saved XX% of the bandwidth which
made the image load faster, so the user will see it before closing the browser in frustration.

What if the image is the most important piece of the content, and you don't want to sacrifice the quality? In that case
you can add a `save-data=off` query parameter to the API. For example:

```
https://pixboost.com/api/2/img/http://www.midday.coffee/assets/banner.jpg/optimise?auth=MTA0ODU5NDA0NQ__&save-data=off
```

What if you don't want to show the image at all? You can use `save-data=hide` query parameter in that case and image API 
will return an empty image:

```
https://pixboost.com/api/2/img/http://www.midday.coffee/assets/banner.jpg/optimise?auth=MTA0ODU5NDA0NQ__&save-data=hide
```

## Conclusion

When you are running online shop, accomodation booking system or any other website it's important to make its inclusive and accessible. 
When we talk about [accessibility](https://en.wikipedia.org/wiki/Web_accessibility) it's not only people with physical disabilities, 
but also includes people with socio-economic restrictions on bandwidth and speed. Using Save-Data header helps us to make the Internet the better
place for all people in the World.

Using tools like Pixboost Image CDN makes usage of Save-Data client hint extremely easy, so you can make sure everyone will
feel welcome when surfing your web pages.





 