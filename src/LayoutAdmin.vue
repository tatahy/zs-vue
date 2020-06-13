<template>
  <div>
    <!-- LayoutAdmin是AHeader的父组件，LayoutAdmin向自己的父组件传递AHead的event -->
    <a-header v-on="$listeners" />
    <a-container class="container-fluid" />
  </div>
</template>

<script>
import AHeader from "./components/admin/AHeader.vue";
// import AContainer from './components/admin/AContainer.vue'

export default {
  name: "LayoutAdmin",
  methods: {},
  components: {
    AHeader,
    AContainer: () => import("@/components/admin/AContainer.vue")
  }
};
</script>

<style scoped>
</style>
