---
title: Deep dive into the Vue Composition API's watch() method
description: This post dives deep into how the Vue 3 watch API works when passed different types of data
authors:
  - Ekene Eze
date: 2021-01-29
lastmod: 2021-01-29
topics:
  - tutorials
tags:
  - vue 3
  - reactivity
  - watch-api
  - composition-api
category: "deep-dive"
format: blog
relatedposts:
  - Reactivity in Vue 3
  - How we built a Vue CLI Plugin for Netlify Lambda
seo:
  metatitle: "Learn Vue Composition API's watch() method - Watch API Tutorial"
  metadescription: "Check out this post to explore Vue's Watch API. The watch API is part of the larger Vue Composition APIs. Learn how to track data changes in Vue 3 applications and much more."
  ogimage: /img/blog/vue-3-watch-api-deep-dive.png
---

![Vue 3 watch API deep dive](https://res.cloudinary.com/kennyy/image/upload/q_auto/v1611869243/watch-api-deep-dive.png)

## Introduction to the Watch API

The watch API is part of the larger Vue Composition APIs. It takes a data source and a callback function that executes when the provided data changes.

```javascript
watch(data, (currentValue, oldValue) => {
  console.log(currentValue);
  console.log(oldValue);
});
```

In my experience, I’ve found that whenever I need to track reactive data and perform some operation when the data changes, [computed properties](https://v3.vuejs.org/guide/computed.html#computed-properties) were all I needed.

However, like the Options API, the Vue Composition API also shipped with watch, that offers developers another way of watching and reacting to data changes. I have found that there’s some nuance around it and I wanted to deep dive into it in this post and shine more light on the different ways you can use it.

This is largely because it behaves differently depending on the type of data you’re watching, and it can get confusing if you’re not already familiar with it. In this post, we’ll look at how to use it when dealing with `ref` and `reactive` states as well as with arrays and objects.

## Watch API with ref

A general rule of thumb when working with the watch API is to know that it takes two arguments. The first is the data source you want to watch and the second is a callback function that applies side effects to that data.

## Watching a single ref

> The examples that will follow is based on simple data types like: numbers, strings booleans. You can skip to [examples on complex data types (arrays and objects)](#complex)

The watch API allows us to watch a single ref or to collectively watch multiples refs. Let's demonstrate how to watch a single ref with **simple data types** (strings, numbers booleans)

When watching a single ref, we simply pass it as the first argument to the watch API. Here’s a quick example:

```javascript
import { watch, ref } from "vue";
export default {
  setup() {
    const name = ref("Jay");
    watch(name, (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);
    });
  }
};
```

This is fairly straightforward. We are watching `name` to ensure that when its value changes, we perform any operation we want in the callback. In this case, we just log the current and old values to the console. The same applies to all other `ref`'s of simple data types like booleans and numbers.

However that's not the case when watching a `ref` of more complex data type like arrays and objects.

**Complex data types**
<a name="complex"></a>

Let's see how to do that with an **array**:

```javascript
import { watch, ref } from "vue";
export default {
  setup() {
    const level = ref([1, 2, 3, 4]);
    watch(
      () => [...level.value],
      (currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      }
    );
  }
};
```

Two things to notice here:

1. We used a function to return the array we want to watch (not passed in directly like we did in the last example)
2. We returned a copy of the values of the array i.e `...level.value` (not the existing array itself).

This is significantly different from what we saw earlier with simple data types. But this is just an array, what if it was an **object**, would it be any different? Let's find out:

```javascript
import { watch, ref } from "vue";
export default {
  setup() {
    const state = ref({
      name: ""
    });
    watch(state.value, (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);
    });
  }
};
```

The difference here is that with objects, we pass the data directly into the watch API, no need to return it with a function or make a copy like we did with the array.

One more thing you'll notice is that for both cases (array and object), the value of `currentValue` and `oldValue` is in fact the same thing. Why? here's [why and how to fix it](#why).

## Nested objects/arrays

What if we had nested objects or arrays, how do we use the watch API to monitor changes in nested arrays/objects?. Let's start with a nested array example:

```javascript
import { watch, ref } from "vue";
export default {
  setup() {
    const secondLevel = ref([5, 6, 7]);
    const level = ref([1, 2, 3, 4, secondLevel.value]);
    watch(
      () => [...level.value],
      (currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      }
    );
  }
};
```

We are watching `level`, which is the parent of the nested `secondLevel` array. Ideally, when the value of `secondLevel` changes, the watch API should execute and log the different values to the console. However, that won't happen becuase:

<a name="why"></a>

> [Watching a reactive object or array will always return a reference to the current value of that object for both the current and previous value of the state. To fully watch deeply nested objects and arrays, a deep copy of values may be required](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-reactive-objects). This can be achieved with a utility such as [lodash.cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep)

As a result, we can use lodash to "deeply" watch the `level` array (this time with access to the nested `secondLevel` array):

```javascript
import { watch, ref } from "vue";
import _ from "lodash";
export default {
  setup() {
    const secondLevel = ref([5, 6, 7]);
    const level = ref([1, 2, 3, 4, secondLevel.value]);

    watch(
      () => _.cloneDeep(level.value),
      (currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      }
    );
  }
};
```

With this, the values of both our arrays will be tracked just fine. The good thing with this approach is that we did't have to copy the array's values anymore, we can simply pass it into `cloneDeep()` and it handles the rest for us. This also applies to nested objects:

```javascript
import { watch, ref } from "vue";
export default {
  setup() {
    const state = ref({
      name: "",
      location: {
        country: ""
      }
    });
    watch(
      () => _.cloneDeep(state.value),
      (currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      }
    );
  }
};
```

## Watching multiple ref's

If we had more than one item that we wanted to watch at once, we can pass them all into the watch API with an array. For instance, if we had `firstName` and `lastName`, we could watch for changes in their values at once like so:

```javascript
import { watch, ref } from "vue";
export default {
  setup() {
    const firstName = ref("Jay");
    const lastName = ref("Pritchett");
    watch([firstName, lastName], (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);
    });
  }
};
```

## Watch API with Reactive

The way the watch API handles `ref` values is somewhat different from how it handles `reactive`. Everything we've done so far has been with `ref` values, let's try redoing them, but this time with `reactive`. This way, we'll cover both values and you will be equipped to use the watch API either way.

## Watching a reactive array

Once again we start off with an array. Here's how to watch a reactive array and react to changes in its value:

```javascript
import { watch, reactive } from "vue";
import _ from "lodash";
export default {
  setup() {
    const level = reactive([1, 2, 3, 4]);
    watch(() => _.cloneDeep(level),(currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      }
    );
}
```

Using the watch API with a `reactive` array is no different from how we used it with a `ref`. In both cases, we deep cloned the array with lodash and return it as the first argument to the watch API. The only difference here is that we did not append `.value` to read the value of the `level` array.

## Watching a nested reactive array

To cut to the chase quickly, using lodash like we did in the last example ensures that we track every aspect of the data we want to watch. As a result, if we have deeply nested arrays, it will track the values as well:

```javascript
import { watch, reactive } from "vue";
import _ from "lodash";
export default {
  setup() {
	const secondLevel = reactive([5, 6, 7]);
	const level = reactive([1, 2, 3, 4, secondLevel]);
  watch(() => _.cloneDeep(level), (currentValue, oldValue) => {
      console.log(currentValue);
      console.log(oldValue);
    }
  );
}
```

This is almost exactly the same with the `ref` example, with the exception of the `.value` appends.

## Watching a reactive object

When dealing with objects, I personally tend to go with `reactive` by default. However the implementation is also not very different from how you would approach a `ref`:

```javascript
import { watch, reactive } from "vue";
import _ from "lodash";
export default {
    const state = reactive({
      name: "",
    });
    watch(() => _.cloneDeep(state),(currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      }
    );
}
```

You can watch an object or an array by deep cloning it using lodash. I have made this approach my default since in most cases, I want to track both the previous and current values of the data I'm watching. If you're okay tracking just the current values, you don't need to use lodash here.

## Watching a nested object

## deep

The watch API can also take a third argument `deep`, which when set to true, will extend its functionality to keep an eye on deeply nested values:

```javascript
import { watch, reactive } from "vue";
export default {
  setup() {
    const state = reactive({
      name: "",
      location: {
        country: "",
      },
    });
    watch(() => state, (currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      },
      { deep: true }
    );
}
```

However, because it doesn't track both previous and current values of `state`, lodash is still my preferred option for using the watch API with reactive nested arrays and objects:

```javascript
import { watch, reactive } from "vue";
import _ from "lodash";
export default {
  setup() {
    const state = reactive({
      name: "",
      location: {
        country: "",
      },
    });
    watch(() => _.cloneDeep(state), (currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      },
    );
}
```

## Watch a specific property in the reactive object

When watching a specific property in a reactive object, the first argument you pass to `watch()` will be an anonymous function that returns the specific property you want to watch.

> Note that in this case, deep copying the object is not required:

```javascript
import { reactive, toRefs, watch } from "vue";
export default {
  setup() {
    const state = reactive({
      name: ""
    });
    watch(
      () => state.name,
      (currentValue, oldValue) => {
        console.log(currentValue);
        console.log(oldValue);
      }
    );
  }
};
```

It is worthy to note that there’s a significant difference in how we watch an entire reactive object and how we watch a specific property in a reactive object as I just demonstrated above. If it's not clear, feel free to text me on [Twitter](https://twitter.com/kenny_io) and I'll be happy to provide some more clarity.

## watchEffect

It would be incomplete to finish this post without telling you a little bit about `watchEffect()`. Unlike the watch API, it takes only one argument, which is a callback function that runs immediately and re-runs when any of its dependencies change. Maybe in a future post, we can look at `watchEffect` in more detail but in the meantime, you can learn more about it [here](https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watcheffect).

Hope this helps you understand how to use the watch API in more detail. If you prefer to learn with videos, I made a not so comprehensive [tutorial on YouTube](https://youtu.be/n6Rciryl2PU) as well.

## More resources

- [Official Vue.js documentation](https://v3.vuejs.org/api/computed-watch-api.html#watch)
- [Vue 3 watch API deep dive - YouTube tutorial](https://youtu.be/n6Rciryl2PU)
- [Launching with the Composition API — Free Video Course](https://explorers.netlify.com/learn/launching-with-composition-api)
