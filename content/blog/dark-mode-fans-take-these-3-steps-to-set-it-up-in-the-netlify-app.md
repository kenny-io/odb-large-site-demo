---
title: Dark mode fans - Take these steps to set it up in the Netlify app
description: New! Turn on dark mode with Netlify Labs, a beta testing area in
  the Netlify web app to try Netlify beta features. We share how we built this
  on Netlivation day.
authors:
  - Kristy Marcinova
date: 2021-04-05
lastmod: 2021-04-05
topics:
  - news
tags:
  - Netlify Labs
  - design
  - UI
category: "ui update"
format: blog
relatedposts:
  - Test Drive Netlify Beta Features with Netlify Labs
  - From semantic CSS to Tailwind - Refactoring the Netlify UI codebase
seo:
  ogimage: /img/blog/dark-mode.png
  metatitle: Dark mode fans - Take these steps to set it up in the Netlify app
  metadescription: New! Turn on dark mode with Netlify Labs, a beta testing area
    in the Netlify web app to try Netlify beta features. We share how we built
    this on Netlivation day.
---

## Any Netlify customer can now turn on dark mode, giving you more options to fit your preferences.

![Dark mode in the Netlify app](/static/images/dark-mode.png "Dark mode in the Netlify app")

It’s easy:

1. [Log in to your Netlify account](https://app.netlify.com/). Click on your avatar and select [Netlify Labs](https://app.netlify.com/user/labs).
2. Enable the appearance settings card. This will allow you to specify a theme.
3. Go to your user settings and scroll down to [“Appearance”](https://app.netlify.com/user/settings#appearance) and select “dark” to experience dark mode in Netlify.

Let us know what you think. You can give us your [feedback by signing up to talk with us in our research program](https://www.netlify.com/research-program/) so we can continue improving. You can always choose to go back to the default view or switch back and forth.

## From a side project to a core capability

As a platform for developers, it felt natural for Netlify to support dark mode. It’s no secret that dark mode is becoming more common on the web across applications because of its accessibility benefits and user preferences. Content can be perceived better in settings with lower light, especially at night time. But it wasn’t until we had begun the process of [refactoring the Netlify UI codebase and moving to Tailwind](https://www.netlify.com/blog/2021/03/23/from-semantic-css-to-tailwind-refactoring-the-netlify-ui-codebase/) that it would actually be manageable.

Still, it likely wouldn’t have been rolled out so quickly without two things: Netlivation Day and Netlify Labs.

## Netlivation Day

Netlivation Day is our internal innovation day. We set aside time for Netlify team members to work together and build projects outside of our day-to-day focus areas. The recent addition of [linkable log lines](https://www.netlify.com/blog/2021/03/04/linkable-log-lines-now-available/), which allows you to link directly to specific lines in your deploy logs, was also spurred from this day.

On Netlivation Day, as a designer, I paired up with [Nasiba](https://twitter.com/nasivuela), a frontend engineer, and in one workday we:

- Named a project driver and contributors working across frontend and design
- Scoped the project, determined our processes, and set up a project channel
- Built our design system for dark mode, leveraging our color palette
- Confirmed and built the ideal MVP, with mocks, a prototype, and implementation
- Tested the prototype

A lot of this work was made possible by a recent refactoring of the Netlify UI codebase and moving to Tailwind, which meant that the set up for dark mode could be done in a single day.

Following the project building day, we demonstrated the capability internally with the internal Netlify team. As a result of the demo, we gathered feedback and made some iterations together.

## Netlify Labs

A lot of innovation days spur great ideas that, after a day’s worth of hacking, don’t go anywhere. Netlify believes in shipping often. That’s why we recently announced [Netlify Labs](https://www.netlify.com/blog/2021/03/31/test-drive-netlify-beta-features-with-netlify-labs), a beta testing area in the Netlify web app where you can test drive Netlify beta features. Dark mode is one of the first features that you can turn on with Netlify Labs.

Without Netlivation Day and Netlify Labs, it would have taken much longer to build, vet, and roll out this feature to all users. Now, anyone who wants to can turn it on with the flip of a switch.

We hope that with the option for dark mode teams can better use Netlify within their own workflow, and teams across all time zones and lighting environments can choose the environment that works best for them.

Want to work with us and join the team? [We’re hiring - check out our careers page](https://www.netlify.com/careers).
