<template>
  <div>
    <div class="flex my-20">
      <h1 class="max-w-md mx-auto text-3xl">Testimonials</h1>
    </div>
    <div class="flex">
      <div
        v-for="test in testimonials"
        :key="test.index"
        class="max-w-md mx-auto flex-1 py-4 px-8 bg-white shadow-lg rounded-lg my-20"
      >
        <div class="flex justify-center md:justify-end -mt-16">
          <img
            class="w-20 h-20 object-cover rounded-full border-2 border-red-500"
            :src="test.image"
          />
        </div>
        <div>
          <h2 class="text-gray-800 text-3xl font-semibold">
            {{ test.message }}
          </h2>
          <p class="mt-2 text-gray-600">{{ test.description }}</p>
        </div>
        <div class="flex justify-end mt-4">
          <a href="#" class="text-xl font-medium text-green-900">{{
            test.name
          }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      testimonials: [
        {
          name: "Cassidy",
          message: "I love Hedges",
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!`,
          image:
            "https://res.cloudinary.com/netlify/image/upload/v1618208198/dxavi/cassidoo.jpg"
        },
        {
          name: "Jason",
          message: "It just works",
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!`,
          image:
            "https://res.cloudinary.com/netlify/image/upload/v1618208198/dxavi/jason.jpg"
        },
        {
          name: "Phil",
          message: "Look no further!",
          description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores
          deserunt ea doloremque natus error, rerum quas odio quaerat nam ex
          commodi hic, suscipit in a veritatis pariatur minus consequuntur!`,
          image:
            "https://res.cloudinary.com/netlify/image/upload/v1618208199/dxavi/phil.jpg"
        }
      ]
    };
  }
};
</script>
