import Vue from 'vue'
import VueRouter from 'vue-router'

import admin from '@/routes/admin';
import index from '@/routes/index';
import logo from '@/components/Logo.vue';

//渲染函数生成的404组件
const page404 = (txt) => {
  return {
    render: (createElement) => {
      // return async (createElement) => {
      //   const h = createElement;
      //   const l = await import('@/components/Logo.vue');
      //   const lo = h(l.default);

      //   console.log(lo);
      //   console.log(h(logo));

      const h = createElement;
      const h3 = h(
        'h3',
        {
          domProps: {
            innerHTML: txt
          },
          class: 'm-5 text-info text-center'
        },
      );
     
      return h('div', [h(logo),h3]);
    }
  };
};

//全局使用vue-router
Vue.use(VueRouter);

const routes = [
  index,
  admin,
  //404页面
  {
    path: '*',
    name: '404page-content',
    components: {
      header: () => import('@/components/index/IHeader.vue'),
      warning: page404('页面不存在！'),
      body: '',
      // body: () => import('@/components/Logo.vue'),
      footer: () => import('@/components/index/IFooter.vue')
    }
  },
];

const router = new VueRouter({
  // mode: "history",
  mode: "hash",
  routes
});

export default router;