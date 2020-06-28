import head from '@/components/admin/AHeader.vue';
import logo from '@/components/Logo.vue';

//渲染函数生成的组件
const headerCom = (opt) => {
  const optdefault = { text: 'error', tag: 'h1', class: 'my-2 text-center' };
  opt = Object.assign({}, optdefault, opt);

  return {
    render: (createElement) => {
      const h = createElement;
      const h1 = h(
        opt.tag,
        {
          domProps: {
            innerHTML: opt.text
          },
          class: opt.class
        },
      );
      return h1;
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
      name: 'admin',
      components: {
        container: logo,
      }
    },
    {
      path: 'emqx/httpapi',
      name: 'http-api',
      components: {
        title: headerCom({ text: '"EmqX Http-API Test"' }),
        container: () => import('@/components/admin/emqx-test/TheEmqxHttpApi.vue'),
      }
    },
    {
      path: 'emqx/mqtt-client',
      name: 'mqtt-client',
      components: {
        title: headerCom({ text: '"EmqX Mqtt-Client Test"' }),
        container: () => import('@/components/admin/emqx-test/TheMqttClient.vue'),
      }
    },
    {
      path: 'terminal',
      name: 'terminal-data',
      components: {
        // title:headerCom({text:'"显示终端数据"'}),
        container: () => import('@/components/admin/terminal-data/DataTable.vue'),
      }
    },
    {
      path: 'equipment/info',
      name: 'equipment-info',
      components: {
        // title: headerCom({ text: '"设备概要信息"' }),
        container: () => import('@/components/admin/equipment/EquipmentInfo.vue'),
      }
    },
    {
      path: 'equipment/data',
      name: 'equipment-data',
      components: {
        title: headerCom({ text: '"设备数据查询"' }),
        container: () => import('@/components/Logo.vue'),
      }
    }
  ],
};