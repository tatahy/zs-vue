<template>
  <div v-bind:class="opt.class">
    <!-- <div v-if="opt.tag=='div' || !opt.tag" v-bind:class="opt.class"> -->
    <template v-if="opt.children.length">
      <div v-for="(child,idx) in opt.children" v-bind:key="idx">
        <!-- <TheTableCell v-bind:opt="child"/> -->
        <a
          v-if="child.tag=='a'"
          v-bind:class="child.class"
          v-bind:id="`tblCell-${opt.id.name}-${opt.id.val}`"
          v-bind:href="child.href+opt.id.val"
          target="_self"
        >{{opt.txt}}</a>
        <b-tooltip
          v-if="child.tag=='b-tooltip'"
          v-bind:target="`tblCell-${opt.id.name}-${opt.id.val}`"
          v-bind:class="child.class"
        >{{child.txt}}</b-tooltip>
        <!-- 
        v-bind:to="{ name: 'terminal-info', params: { info_id: opt.id }}"
        v-on:click="onClick"-->

        <!-- v-bind:id="opt.id" 
        v-bind:href="child.href+opt.id"-->

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

    <!-- </div> -->
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
    // onClick(eve) {
    //   eve.preventDefault();
    //   this.$router.push({ name: 'terminal-data', query: { info_id:eve.target.id}});
    //   console.log(this.$router);

    // }
    setStatusCls(str) {
      const pref = "px-2 alert-";
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
