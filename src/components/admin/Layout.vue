<template>
  <div>
    <a-header />
    <router-view class="container-fluid" name="container"></router-view>
  </div>
</template>

<script>
import AHeader from "@/components/admin/AHeader.vue";
// import AContainer from './components/admin/AContainer.vue'

export default {
  name: "Layout",
  methods: {},
  components: {
    AHeader,
  }
};
</script>

<style scoped>
</style>
