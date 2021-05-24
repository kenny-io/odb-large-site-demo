<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div
          v-for="product in products"
          :key="product._id"
          class="w-3/5 h-auto lg:w-1/4 md:w-1/2 p-4 w-full	"
        >
          <div class="max-w-lg max-h-50 rounded overflow-hidden shadow-lg">
            <img
              class="max-w-24 max-h-32"
              :src="product.imageUrl"
              alt="Sunset in the mountains"
            />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">{{ product.title }}</div>
              <p class="text-gray-700 text-base">
                {{ product.blurb }}
              </p>
              <p class="text-gray-700 text-base font-bold">
                ${{ product.price }}
              </p>
            </div>
            <div class="px-6 pt-4 pb-2">
              <span
                class="inline-block bg-green-900 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                ><nuxt-link
                  :to="`/shop/${product.slug.current}`"
                  class="text-white"
                >
                  View Product</nuxt-link
                ></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { groq } from "@nuxtjs/sanity";
export default {
  async asyncData({ $sanity }) {
    const query = groq`
      *[_type == "product"]{
        title,
        slug,
        _id,
        "price": defaultProductVariant.price,
        "imageUrl": defaultProductVariant.images[0].asset->url,
        "blurb": blurb.en
      }`;
    const products = await $sanity.fetch(query);

    return { products };
  }
};
</script>
