---
title: Modern, faster Netlify Functions
description: We're improving Netlify Functions to give developers better and
  faster serverless workflows. Try the public beta of our function bundler and
  new JavaScript features.
authors:
  - Eduardo Bouças
date: 2021-04-02T16:00:00.000Z
lastmod: 2021-04-01
topics:
  - news
tags:
  - functions
category: "guide"
format: blog
relatedposts:
  - Netlify Functions - for an unrivaled serverless workflow
seo:
  metatitle: "Modern, faster Netlify Functions: New bundler and JavaScript features"
  metadescription:
    We're improving Netlify Functions to give developers better and
    faster serverless workflows. Try out our function bundler and new JavaScript
    features.
  ogimage: /img/blog/og-modern-faster-netlify-functions.png
---

We've been working on a series of improvements to Netlify Functions that will give developers better and faster serverless workflows. In the spirit of sharing progress earlier and more often, we want to let you in while we're still developing this feature and use your feedback to create the best possible experience.

## A better, faster bundler

When you publish a JavaScript function, our build system does some processing to package your code and its dependencies into a self-contained, deployable artifact. This is known as _bundling_.

This process involves some optimizations to ensure that your functions are as small and fast as possible, like discarding any code that doesn’t contribute to the output of the program (_dead code elimination_), as well as filtering the dependencies — and the subset of their files — that your function actually needs (_tree shaking_).

![The bundling process - functions are as small and fast as possible.](/img/blog/bundled-function.png "The function bundling process - functions are as small and fast as possible.")

With the latest release of [our function bundler](https://github.com/netlify/zip-it-and-ship-it), we’re starting to use [esbuild](https://esbuild.github.io/) under the hood to handle some parts of this. It also includes an additional step of _inlining_, where your function code and its dependencies are physically merged into a single file.

For you, this means a faster bundling process and smaller, more performant functions.

## How to enable the new bundler

The new bundler will be enabled for all projects during the week of May 17, but you can choose to opt-in right now to test the new functionality in public beta and take advantage of the performance improvements immediately.

We've added a new `node_bundler` property to the `netlify.toml` [configuration file](https://docs.netlify.com/configure-builds/file-based-configuration/#functions). To enable the new bundler, set its value to `esbuild`.

```toml
[functions]
  node_bundler = "esbuild"
```

We're working hard to make sure that your functions automatically work with the new bundler, with no changes required from you. Still, such a fundamental change to the bundling engine creates the risk for some edge cases that might need your attention.

To account for this, we've introduced an advanced configuration section.

## Advanced configuration

You can define a list of modules that should be copied to the generated function artifact with their source and references untouched, skipping the inlining and tree-shaking stages. This is useful for handling dependencies that can’t be inlined, such as modules with native addons.

This is done with the `external_node_modules` property, which you can apply to all functions, or filter some them by name using a [wildcard pattern](https://en.wikipedia.org/wiki/Wildcard_character).

```toml
# All functions
[functions]
  external_node_modules = ["module-one", "module-two"]

# Functions with a name starting with "my-function-*"
[functions."my-function-*"]
  external_node_modules = ["module-three", "module-four"]

# A function named "my-function-1"
[functions.my-function-1]
  external_node_modules = ["module-five", "module-six"]
```

We’ll continue to work on detecting and handling these cases automatically so that you don’t have to configure anything. Still, we wanted to give you this level of control should you need it.

Also, we'll automatically fall back to the default bundler if an error occurs during the bundling stage.

## New ECMAScript features

In addition to bundling functions faster and smaller, esbuild makes it possible for you to write your functions using the [ECMAScript modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/) (or ES modules) syntax, which makes use of the `import` and `export` keywords instead of the `require` and `module.exports` primitives seen in [CommonJS modules](https://nodejs.org/docs/latest/api/modules.html).

To use this syntax in a function, you should create a module that exports a function named `handler`.

```javascript
import { something } from "some-module";

export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" })
  };
}
```

There are additional language features that are now also supported, such as [optional chaining](https://github.com/tc39/proposal-optional-chaining), [nullish coalescing](https://github.com/tc39/proposal-nullish-coalescing), and [logical assignment operators](https://github.com/tc39/proposal-logical-assignment).

Note that these features are currently only supported when using the new bundler.

---

Whether you’re a Netlify Functions power user or you’re just getting started, we’d love to [hear about your experience](https://answers.netlify.com/) with these new features. If you’re looking for some examples to get you off the ground, make sure to check out our [Functions playground](https://functions.netlify.com/playground/).
