---
title: "High DPI in HTML examples"
date: 2022-03-15T19:49:31Z
draft: false
description: "TODO"
v2: true
---


## Using DPI descriptor

```html
<img srcset="
    ../cheetah.jpg,
    ../cheetah-2x.jpg 2x,
    ../cheetah-3x.jpg 3x,
"
    src="../cheetah.jpg"
    alt="Cheetah"/>
```

{{< rawhtml >}}
<img srcset="
../cheetah.jpg,
../cheetah-2x.jpg 2x,
../cheetah-3x.jpg 3x,
"
src="../cheetah.jpg"
alt="Cheetah"/>
{{< /rawhtml >}}

## Using width descriptors

```html
<img srcset="
        ../cheetah-200w.jpg 200w,
        ../cheetah-400w.jpg 400w,
        ../cheetah-400w.jpg 500w,
        ../cheetah-600w.jpg 600w,
        ../cheetah-800w.jpg 800w,
        ../cheetah-800w.jpg 1000w,
        ../cheetah-1200w.jpg 1200w,
    "
     src="../cheetah.jpg"
     sizes="
        (max-width: 768px) 100vw,
        400px
    "
     alt="Cheetah"/>
```

{{< rawhtml >}}
<img srcset="
        ../cheetah-200w.jpg 200w,
        ../cheetah-400w.jpg 400w,
        ../cheetah-400w.jpg 500w,
        ../cheetah-600w.jpg 600w,
        ../cheetah-800w.jpg 800w,
        ../cheetah-800w.jpg 1000w,
        ../cheetah-1200w.jpg 1200w,
    "
    src="../cheetah.jpg"
    sizes="
        (max-width: 768px) 100vw,
        400px
    "
    alt="Cheetah"/>
{{< /rawhtml >}}