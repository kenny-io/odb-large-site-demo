<template>
  <div>
    <Header />
    <Testimonials />
    <Features />
  </div>
</template>

<script>
import Header from "../components/Header";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";

export default {
  components: {
    Header,
    Testimonials,
    Features
  }
};
</script>
