<template>
  <div id="app">
    <!-- <Index v-if="isIndexShown" v-on:event-show-index="showPage" />
    <Admin v-else v-on:event-show-index="showPage" />-->

    <Index v-if="showIndex" />
    <Admin v-if="showAdmin" />
  </div>
</template>

<script>
import { mapState } from "vuex";

import Index from "./LayoutIndex.vue";
import Admin from "./LayoutAdmin.vue";

export default {
  name: "App",
  data() {
    return {
      isIndexShown: true
    };
  },
  computed: {
    ...mapState({
      showIndex: state => state.showPage.index,
      showAdmin: state => state.showPage.admin
    })
  },
  methods: {
    showPage(evt) {
      this.isIndexShown = evt;
    }
  },
  components: {
    Index,
    Admin
  }
};
</script>

<style lang='scss'>
//引入bootstrap4样式文件
@import "~bootstrap/dist/css/bootstrap.min.css";

//引入bsv样式文件
@import "~bootstrap-vue/dist/bootstrap-vue.min.css";

//引入个人定制的bootstrap4样式文件
// @import '~@/scss/custom.scss';
</style>
