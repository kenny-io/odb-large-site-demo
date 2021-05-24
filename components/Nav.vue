<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="relative bg-white">
    <div class=" mx-auto px-4 sm:px-6">
      <div
        class="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10"
      >
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <span class="sr-only">Workflow</span>
            <img
              class="h-8 w-auto sm:h-10"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvcScFQoVMwuFx_3cSqJ_l5QC1FE9EpkLo6g&usqp=CAU"
              alt=""
            />
          </a>
        </div>
        <nav class="hidden md:flex space-x-10">
          <a
            href="/shop"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Shop
          </a>
          <a
            href="/about"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            About
          </a>
          <a
            href="/docs"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Docs
          </a>

          <a
            href="/blog"
            class="text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Blog
          </a>
        </nav>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <a
            href="#"
            class="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          >
            Sign in
          </a>
          <a
            href="#"
            class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-900 hover:bg-red-900"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
