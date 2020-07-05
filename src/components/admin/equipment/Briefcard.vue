<template>
  <div class="card">
    <!-- <h5 class="card-title text-center py-2 bg-secondary text-white">{{title}}</h5> -->
    <h5 class="m-0 text-center py-2 rounded-top bg-light">{{title}}</h5>

    <!-- <ul class="list-group list-group-flush border-top border-bottom">
      <li
        v-on:mouseover="showClass[0]=false"
        v-on:mouseout="showClass[0]=true"
        v-on:click="updateItems({title:'（状态）',subTitle:'aa',idArr:[1,3,2]})"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>txt</span>
        <span class="pl-2 border-left" v-bind:class="showClass[0]?'border-success':'border-white'">
          <span v-bind:class="showClass[0]?'text-muted':''">数量：</span>
          222
        </span>
      </li>
      <li
        v-on:mouseover="showClass1=false"
        v-on:mouseout="showClass1=true"
        v-on:click="updateItems({txt:'aa',idArr:[1,3,2]})"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span v-bind:class="showClass1?'px-2 alert-success':''">obj.txt</span>
        <span class="pl-2 border-left" v-bind:class="showClass1?'border-success':'border-white'">
          <span v-bind:class="showClass1?'text-muted':''">数量：</span>
          <span v-bind:class="showClass1?'px-2 alert-success':''">obj.idArr.length</span>
        </span>
      </li>
      <li class="list-group-item">Vestibulum at eros</li>
    </ul>-->

    <ul class="list-group list-group-flush border-top border-bottom">
      <li
        
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="(obj,idx) in brief.items"
        v-bind:id="`tooltip-li-${obj.value}-${idx}`"
        v-bind:key="idx"
        v-on:click="updateItems(obj)"
      >
      <b-tooltip v-bind:target="`tooltip-li-${obj.value}-${idx}`" variant="info">点击显示详细信息</b-tooltip>
         <!-- v-b-tooltip.hover
        title="点击显示详细信息" -->
        
        <!-- v-on:mouseover="showClass=false"
        v-on:mouseout="showClass=true"-->

        <!-- v-on:mouseover="brief.showClass[idx]=false"
        v-on:mouseout="brief.showClass[idx]=true" -->


        <span v-bind:class="setSpanCls(idx,obj.value)">{{obj.txt}}</span>
        <span class="pl-2 border-left border-dark">
          <span v-bind:class="brief.showClass[idx]?'text-muted':''">数量：</span>
          <span v-bind:class="setSpanCls(idx,obj.value)">{{obj.idArr.length}}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import {
  BTooltip,
  // VBTooltip
} from "bootstrap-vue";

import { asyFetch, getServUrl } from "@/utility/util";

export default {
  name: "Briefcard",
  props: {
    title: {
      type: String
      // default: ""
    },
    reqOpt: {
      type: Object,
      required: true,
      default: function() {
        return {
          tblName: "info",
          fields: ["id", "status"],
          query: {
            group: { group: "status" }
          }
        };
      }
    }
  },
  data() {
    return {
      // showClass: true,
      // showClass0: true,
      // showClass1: true,
      // brief: {
      //   totalNum: 0,
      //   type: [],
      //   location: [],
      //   status: [],
      //   ready: false
      // }
      brief: {
        fields: "",
        //items:[{txt:str,value:str,idArr:[]}]
        items: [],
        ready: false,
        showClass: []
      }
    };
  },
  computed: {},
  watch: {
    // "brief.showClass": {
    // brief: {
    //   handler() {
    //    console.log('watch ',this.brief.showClass);
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    getDataBrief: async function() {
      const obj = this.brief;
      const opt = { method: "POST", body: JSON.stringify(this.reqOpt) };
      const url = getServUrl() + "equipment/brief";

      if (!obj.ready) {
        const res = await asyFetch(url, opt);
        if (res.ok) {
          obj.items = res.cont.items;
          obj.ready = true;
          for (let i = 0; i < obj.items.length; i++) {
            obj.showClass[i] = true;
          }
        }
      }
    },
    updateItems(opt) {
      return this.$emit("evt-update-items", opt);

      // alert(evt.target.tagName);
    },
    setSpanCls(idx, val) {
      let str = Number(val).toString();
      let show = this.brief.showClass[idx];
      const obj = {
        100: "alert-dark",
        200: "alert-success",
        300: "",
        400: "alert-danger",
        500: "alert-warning"
      };
      let spanCls = "px-2 ";

      if (show && Object.keys(obj).includes(str)) {
        spanCls += obj[str];
        // console.log(show, spanCls);
      }

      return spanCls;
    },
    setShowClass(idx, val = true) {
      this.brief.showClass[idx] = val;
      console.log("setShowClass li " + idx);
    }
  },
  components: {
    BTooltip
  },
  created() {
    this.getDataBrief();
  },
  // directives: {
  //   "b-tooltip": VBTooltip
  // },
};
</script>

<style scoped>
li:hover {
  cursor: pointer;
  background-color: #f8f9fa;
}

li:active,
li span:active {
  color: #fff !important ;
  background-color: #007bff !important;
  border-color: #fff !important;
}
</style>
