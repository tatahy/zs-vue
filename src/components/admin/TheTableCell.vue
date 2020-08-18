<template>
  <div v-bind:class="opt.class">

    <template v-if="opt.children.length">
      <div v-for="(child,idx) in opt.children" v-bind:key="idx">
        <!-- <TheTableCell v-bind:opt="child"/> -->
        <a
          
          v-if="child.tag=='a'"
          v-bind:class="child.class"
          v-bind:id="`tblCell-${opt.id.name}-${opt.id.val}`"
          v-bind:href="child.href"
          v-on:click="onClick"
        >{{Array.isArray(opt.txt)?opt.txt.toString():opt.txt}}</a>
<!-- 
  v-bind:href="child.href+opt.id.val"
  v-bind:target="child.hasOwnProperty('target')?child.target:'_self'" -->

        <b-tooltip
          v-if="child.tag=='b-tooltip'"
          v-bind:target="`tblCell-${opt.id.name}-${opt.id.val}`"
          v-bind:class="child.class"
        >{{child.txt}}</b-tooltip>

        <span 
          v-if="child.tag=='span'" 
          v-bind:class="child.class" 
          v-bind:id="opt.id"
        >{{child.txt}}</span>
        
      </div>
    </template>

    <template v-else>
      <span v-bind:class="setStatusCls(opt.txt)">{{opt.txt}}</span>
    </template>

  </div>
</template>

<script>
import {
  BTooltip
  // VBTooltip
} from "bootstrap-vue";

export default {
  name: "TheTableCell",
  props: {
    opt: {
      type: Object
    }
  },
  methods: {
    onClick(eve) {
      eve.preventDefault();
       
      const url=this.$router.resolve(this.opt.route);
      //打开新窗口
      window.open(url.href,this.opt.target);
    

    },
    setStatusCls(str) {
      // const pref = "px-2 alert-";
      const pref = "badge badge-";
      const clsArr = [
        { txt: "正常", value: pref + "success" },
        { txt: "异常", value: pref + "danger" },
        { txt: "离线", value: pref + "warning" }
      ];
      let cls = "";

      for (let i = 0; i < clsArr.length; i++) {
        if (str === clsArr[i].txt) {
          cls = clsArr[i].value;
          break;
        }
      }

      return cls;
    }
  },
  components: {
    "b-tooltip": BTooltip
  },
  created() {
    // console.log(this.opt);
  }
};
</script>

<style scoped>
a:hover {
  cursor: pointer;
  /* background-color: #f8f9fa; */
}
</style>
