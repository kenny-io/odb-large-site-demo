---
title: Requirements
description: "i18n (Internationalization) for your Nuxt project"
position: 1
category: ""
features:
  - Integration with vue-i18n
  - Automatic routes generation and custom paths
  - Search Engine Optimization
---

## Requirements

There’s an occasional misconception that since Jamstack sites and applications don't rely on traditional server architectures, they aren't able to handle powerful, and dynamic enterprise experiences. Well, the Jamstack, like any other technology, has evolved a lot since inception and is currently capable of handling large sites and enterprise applications.

In this post, we'll walk through some practical strategies you can employ to leverage the Jamstack offerings for your enterprise projects and applications.

## How we are solving for enterprise sites on the Jamstack

- [Making real architectural assessments](#percieved-complexity)
- [Solving for long build times](#high-build-times)
- [Integration / Migration from legacy stacks](#migration-difficulty)
- [Content personalization](#content-personalization)

<a id="percieved-complexity"></a>

## Real architectural assessments

There are lots of assumptions that big companies make about how exotic their requirements are (because it has always been expensive and complex, so we MUST need the most expensive, most specialist tools, right?). Often, companies don’t make real assessments of their requirements because they base them on capabilities they see on a list of features from large enterprise software vendors.

Better education and more intentional assessments of enterprise infrastructural requirements can offer a solution to this. As a community, it falls on us to collectively educate ourselves and others about the perceived complexities of enterprise applications. Making real assessments of enterprise stacks and representing them accordingly as it relates to the Jamstack would ultimately lead to better solutions.

<a id="high-build-times"></a>

## Long build times

Enterprise sites are sometimes very large, with many thousands of pages. Over time regular addition of content by the teams managing it can also see the site size and its build time swell. Seeing that the Jamstack architecture is based on pre-generating all the site's pages at build time, and hosting it on a CDN, build times can get unfavourably long for very large sites.

The disadvantages of that is:

- Cost - the more build minutes your site demands, the more you pay
- Longer lead times for update previews

This is a common challenge when dealing with large sites on the Jamstack. However, a number of techniques have become popular in addressing this challenge, some of which are:

- Splitting large sites into logical sub-sections
- Generating only necessary pages at build time
- Incremental builds

## Splitting large sites into logical sub-sections

This approach encourages you to break out your large site into smaller, focused micro sites that are independent of each other. Then, tie them back together using [Netlify redirects](https://docs.netlify.com/routing/redirects/) and [proxies](https://docs.netlify.com/routing/redirects/rewrites-proxies/). A theoretical exmple would be:

- You have a main site at `www.company.com` that links off to multiple other pages like `/about`, `/docs`, `/products`, `/blog` etc.
- If that is the case, then it makes sense to build `products`, `blog`, and `docs` as standalone micro sites which will be available as independent sites.
- In your main site `(www.company.com)`, you can use Netlify redirects or proxies to connect the micro sites back to your primary site as:

1. `www.company.com/docs` - With proxies or
2. `docs.company.com` - With redirects, depending on your preference.

> If this theory sounds a bit too vague, please refer to this [indepth guide](https://www.netlify.com/blog/2020/06/16/building-large-sites-on-netlify/) for a better understanding
