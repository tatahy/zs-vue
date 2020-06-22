import head from '@/components/index/IHeader.vue';
import foot from '@/components/index/IFooter.vue';
import body from '@/components/index/IContainer.vue';

export default {
  //顶层路由
  path: '/',
  name: '',
  components:{
    header:head,
    body:body,
    footer:foot
  },
  //二级路由
  children: [
    {
      path: 'index',
      name: "index",
      // components: {
      //   body: body,
      //   footer:foot
      // }
    }
  ]
}