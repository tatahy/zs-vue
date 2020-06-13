<template>
  <div>
    <!-- <div class="layout-index"> -->
    <i-header v-on:event-show-index="showAdmin" />

    <i-container class="container-xl" />
    <!-- <i-container class="container-fluence" /> -->
    <i-footer />
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
    showAdmin() {
      this.$emit("event-show-index", false);
    }
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
