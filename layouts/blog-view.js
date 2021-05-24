module.exports = post => {
  return `
  <template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div
        class="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto"
      >
        <nuxt-content :document=${post}></nuxt-content>
      </div>
    </div>
  </section>
</template>
  `;
};
