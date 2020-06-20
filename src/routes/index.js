// import header from '@/components/index/IHeader.vue';

export default {
  //顶层路由
  path: '/',
  component: () => import('@/components/index/Layout.vue'),
  //二级路由
  children: [
    {
      path: 'index',
      name: "index",
      components: {
        container: () => import('@/components/index/IContainer.vue'),
      }
    },
    {
      path: '',
      components: {
        container: () => import('@/components/index/IContainer.vue'),
      }
    }
  ],

};