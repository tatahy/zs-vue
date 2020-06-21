import Vue from 'vue'
import VueRouter from 'vue-router'

import init from '@/components/index/Layout.vue';

import admin from '@/routes/admin';
import index from '@/routes/index';

//渲染函数生成的404页面
const page404 = {
  render: function (createElement) {
    return createElement(
      'h3',
      {
        domProps: {
          innerHTML: '页面不存在！'
        },
        class:'text-center p-3'
      }
    )
  }
};
//全局使用vue-router
Vue.use(VueRouter);

const routes = [
  index,
  admin,
  //404页面
  {
    path: '*',
    name:'',
    component: init,
    children: [{
      path: '',
      name:'404page-content',
      components: {
        container: page404
      }
    }]
  },
];

const router = new VueRouter({
  // mode: "history",
  mode:"hash",
  routes
});

export default router;