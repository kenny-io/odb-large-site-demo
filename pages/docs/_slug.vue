<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      class="md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 m-3 md:mb-0 pb-10 border-b border-gray-200"
    >
      <h1 class="sm:text-2xl font-medium  mb-2 text-gray-900">
        On this page
      </h1>
      <p
        v-for="header in doc.toc"
        :key="header.id"
        class="leading-relaxed text-base"
      >
        {{ header.text }}
      </p>
    </div>
    <div class="col-span-2">
      <nuxt-content :document="doc"></nuxt-content>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const doc = await $content("docs", params.slug).fetch();
    return { doc };
  }
};
</script>

<style>
.nuxt-content h2 {
  font-weight: bold;
  font-size: 20px;
  margin: 15px 0 10px 0;
}
.nuxt-content p {
  margin-top: 10px;
}
</style>
