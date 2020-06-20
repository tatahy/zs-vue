<template>
  <div id="app">
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "Home",
  //  computed: {
  //   username() {
  //     // We will see what `params` is shortly
  //     return this.$route.params.username
  //   }
  // },
  // methods: {
  //   goBack() {
  //     window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
  //   }
  // },
  // created(){
  //   console.log(this.$route);
  // }
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
