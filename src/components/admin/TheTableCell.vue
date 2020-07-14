<template>
  <div v-bind:class="opt.class">
    <!-- <div v-if="opt.tag=='div' || !opt.tag" v-bind:class="opt.class"> -->
    <template v-if="opt.children.length">
      <div v-for="(child,idx) in opt.children" v-bind:key="idx">
        <!-- <TheTableCell v-bind:opt="child"/> -->
        <a
          v-if="child.tag=='a'"
          v-bind:class="child.class"
          v-bind:id="opt.id"
          
          v-bind:href="`#/admin/terminal/?info_id=${opt.id}`"
          target="_self" 
        >{{opt.txt}}</a>
<!-- 
        v-bind:to="{ name: 'terminal-info', params: { info_id: opt.id }}"
        v-on:click="onClick" -->

        <span v-if="child.tag=='span'" v-bind:class="child.class" v-bind:id="child.id">{{child.txt}}</span>

        <b-tooltip
          v-bind:target="opt.id"
          v-if="child.tag=='b-tooltip'"
          v-bind:class="child.class"
        >{{child.txt}}</b-tooltip>
      </div>
    </template>
    <template v-else>{{opt.txt}}</template>

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
