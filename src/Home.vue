<template>
  <div id="app">
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view name='header'></router-view>
    <router-view name='body' class="container-fluid" ></router-view>
    <router-view name='warning'></router-view>
    <router-view name='footer'></router-view>
  </div>
</template>

<script>

export default {
  name: "Home",
};
</script>

<style lang='scss'>
//引入bootstrap4样式文件全局使用
@import "~bootstrap/dist/css/bootstrap.min.css";

//引入bsv样式文件全局使用
@import "~bootstrap-vue/dist/bootstrap-vue.min.css";

//引入个人定制的bootstrap4样式文件全局使用
// @import '~@/scss/custom.scss';
</style>
