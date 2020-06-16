<template>
  <div>
    <!-- <div class="layout-index"> -->
    <i-header />

    <i-container class="container-xl" />
    <!-- <i-container class="container-fluid" /> -->
    <hr>
    <i-footer class="container" />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import IFooter from "./components/index/IFooter.vue";
import IHeader from "./components/index/IHeader.vue";
// import IContainer from './components/index/IContainer.vue'

export default {
  name: "LayoutIndex",
  methods: {
   
  },
  components: {
    IHeader,
    IContainer: () => import("@/components/index/IContainer.vue"),
    IFooter
  }
};
</script>

<style>

</style>
