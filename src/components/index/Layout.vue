<template>
  <div>
    <!-- <div class="layout-index"> -->
    <!-- <i-header /> -->

    <!-- <i-container class="container-xl" /> -->

    <!-- <i-container class="container-fluid" /> -->
    <!-- <hr /> -->
    <!-- <i-footer class="container" /> -->
    <!-- <i-header /> -->
    <router-view class="container-xl" name="container"></router-view>
    <hr />
    <i-footer class="container" />

  </div>
</template>

<script>
import IFooter from "@/components/index/IFooter.vue";
// import IHeader from "@/components/index/IHeader.vue";
// import IContainer from './components/index/IContainer.vue'

export default {
  name: "Layout",
  methods: {},
  components: {
    // IHeader,
    // IContainer: () => import("@/components/index/IContainer.vue"),
    IFooter
  },

};
</script>

<style>
</style>
