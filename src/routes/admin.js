import head from '@/components/admin/AHeader.vue';
import logo from '@/components/Logo.vue';

//渲染函数生成的组件
const headerCom = (opt) => {
  const optdefault = { txt: 'error', tag: 'h1', class: 'my-2 text-center' };
  opt = Object.assign({}, optdefault, opt);
  return {
    render: (createElement) => {
      const h = createElement;
      const node = (prop) => {
        return h(
          prop.tag,
          {
            // domProps: {
            //   innerHTML: prop.txt
            // },
            class: prop.class
          },
          [prop.txt],
        );
      };

      return node(opt);
      // return h(
      //   opt.tag,
      //   {
      //     domProps: {
      //       innerHTML: opt.txt
      //     },
      //     class: opt.class
      //   },
      // );
    }
  };
};

 //query方式类似get方法，query中的所有内容都再url中，刷新页面也存在
//params方式类似post方法，params中的所有内容不在url中，刷新页面就消失
      

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
        title: headerCom({txt:"后台管理系统"}),
        container: logo,
      }
    },
    {
      path: 'equipment/info',
      name: 'equipment-info',
      components: {
        // title: headerCom({ txt: '"设备概要信息"' }),
        container: () => import('@/components/admin/equipment/Information.vue'),
      }
    },
    {
      path: 'equipment/data',
      name: 'equipment-data',
      components: {
        // title: headerCom({ txt: '"设备数据查询"' }),
        container: () => import('@/components/admin/equipment/module/DataTable.vue'),
      }
    },
    {
      path: 'equipment/chart',
      name: 'equipment-chart',
      components: {
        // title: headerCom({ txt: '"设备数据查询"' }),
        container: () => import('@/components/admin/equipment/Chart.vue'),
      }
    },
    {
      path: 'test/httpapi',
      name: 'emqx-http-api',
      components: {
        // title: headerCom({ txt: '"设备数据查询"' }),
        container: () => import('@/components/admin/test/emqx/TheEmqxHttpApi.vue'),
      }
    },
    {
      path: 'test/mqttclient',
      name: 'emqx-mqtt-client',
      components: {
        // title: headerCom({ txt: '"设备数据查询"' }),
        container: () => import('@/components/admin/test/emqx/TheMqttClient.vue'),
      }
    },
    {
      path: 'test/postdata',
      name: 'post-data',
      components: {
        // title: headerCom({ txt: '"设备数据查询"' }),
        container: () => import('@/components/admin/test/PostData.vue'),
      }
    },
    {
      path: 'module',
      name: 'module',
      components: {
        // title:headerCom({txt:'"显示终端数据"'}),
        container: () => import('@/components/admin/module/TheModule.vue'),
      }
    },
  ],
};