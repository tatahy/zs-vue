<template>
  <div>
    <div class="foot-nav d-flex justify-content-center">
      <div class="px-1 w-25" v-for="itm in itmArr" v-bind:key="itm.title">
        <dl>
          <dt class="pb-2">{{itm.title}}</dt>
          <dd v-for="arr in itm.aTag" v-bind:key="arr.text">
            <a v-bind:href="arr.href" v-bind:target="arr.target">{{arr.text}}</a>
          </dd>
        </dl>
      </div>
    </div>

    <p class="text-center">
      <span>中术有限公司</span>
      <br>
      <span>版权所有{{year-1+'~'+year}}</span>
    </p>
    

  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

const item = [
  {
    title: "公司简介",
    aTag: [
      { href: "#", target: "_blank", text: "公司概况" },
      { href: "#", target: "_blank", text: "公司文化" }
    ]
  },
  {
    title: "产品服务",
    aTag: [
      { href: "#", target: "_blank", text: "标准电磁泵" },
      { href: "#", target: "_blank", text: "定制电磁泵" }
    ]
  },
  {
    title: "联系我们",
    aTag: [
      { href: "#", target: "_blank", text: "地址" },
      { href: "#", target: "_blank", text: "联系电话" }
    ]
  }
];

export default {
  name: "IFooter",
  data() {
    return {
      itmArr: item,
      year:new Date().getFullYear()
    };
  },
  components: {}
};
</script>

<style scoped>
.foot-nav dl dd a {
    /* font-size: 12px !important; */
    color: #a0a0a1;
    /* line-height: 25px!important; */
}
a:hover {
    text-decoration: none;
    color: #17a2b8!important;
}
</style>
