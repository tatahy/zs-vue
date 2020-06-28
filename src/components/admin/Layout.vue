<template>
  <div>
      <router-view name="title"></router-view>
      <router-view name="container" class="mb-5 mt-2"></router-view>
  </div>
</template>

<script>


export default {
  name: "Layout",
  
};
</script>

<style scoped>
</style>
