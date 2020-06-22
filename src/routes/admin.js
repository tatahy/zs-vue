import head from '@/components/admin/AHeader.vue';
import logo from '@/components/Logo.vue';

//渲染函数生成的组件
const titleCom = (txt,tag='h1') => {
  return {
    render: (createElement) => {
      const h = createElement;
      const h1 = h(
        tag,
        {
          domProps: {
            innerHTML: txt
          },
          class: 'my-2 text-center'
        },
      );
      return h1;
      // return h('div', { class: 'text-center' }, [h(lo), alert]);
    }
  };
};

export default {
  //顶层路由
  path: '/admin',
  name: "",
  // component: () => import('@/components/admin/Layout.vue'),
  components: {
    header: head,
    body: () => import('@/components/admin/Layout.vue'),
    footer: ''
  },
  //二级路由logo
  children: [
    {
      path: '',
      name: "admin",
      components: {
        container: logo,
      }
    },
    {
      path: 'emqx/httpapi',
      name: "http-api",
      components: {
        title:titleCom('"EmqX Http-API Test"') ,
        container: () => import('@/components/admin/emqx-test/TheEmqxHttpApi.vue'),
      }
    },
    {
      path: 'emqx/mqtt-client',
      name: "mqtt-client",
      components: {
        title: titleCom('"EmqX Mqtt-Client Test"'),
        container: () => import('@/components/admin/emqx-test/TheMqttClient.vue'),
      }
    }
  ],
};