
export default {
  //顶层路由
  path: '/admin',
  component: () => import('@/components/admin/Layout.vue'),
  //二级路由
  children: [
    {
      path: '',
      name: "admin",
      components: {
        container: () => import('@/components/admin/AContainer.vue'),
      }
    },
    {
      path: 'emqx-test',
      name: "emqx-test",
      components: {
        container: () => import('@/components/admin/emqx-test/TheLayer.vue'),
      }
    },
  ],
};