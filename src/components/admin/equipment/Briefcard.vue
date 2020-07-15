<template>
  <div class="card">
    <h5 class="m-0 text-center py-2 rounded-top bg-light">{{title}}</h5>

    <ul class="list-group list-group-flush border-top border-bottom">
      <li
        
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="(item,idx) in items"
        v-bind:id="`tooltip-li-${item.value}-${idx}`"
        v-bind:key="idx"
        v-on:click="onUpdateItems(item)"
      >
      <b-tooltip v-bind:target="`tooltip-li-${item.value}-${idx}`" variant="info">点击显示详细信息</b-tooltip>
         <!-- v-b-tooltip.hover
        title="点击显示详细信息" -->
        
        <!-- v-on:mouseover="showClass=false"
        v-on:mouseout="showClass=true"-->

        <!-- v-on:mouseover="brief.showClass[idx]=false"
        v-on:mouseout="brief.showClass[idx]=true" -->


        <span v-bind:class="setSpanCls(idx,item.value)">{{item.txt}}</span>
        <span class="pl-2 border-left border-dark">
          <span v-bind:class="showClass[idx]?'text-muted':''">数量：</span>
          <span v-bind:class="setSpanCls(idx,item.value)">{{item.idArr.length}}</span>
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

export default {
  name: "Briefcard",
  props: {
    title: {
      type: String
      // default: ""
    },
    
    items:{
      type:Array,
      required:true,
      default:function(){
        return [{txt:'',value:'',idArr:[]}];
      }
    }
  },

  computed: {
    showClass:function(){
      let arr=[];
      for(let i=0;i<this.items.length;i++){
        arr[i]=true;
      }
      return arr;
    }
  },
  
  methods: {
    onUpdateItems(item) {
      return this.$emit("evt-update-items", item);
    },
    setSpanCls(idx, val) {
      let str = Number(val).toString();
      let show = this.showClass[idx];
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
      this.showClass[idx] = val;
      console.log("setShowClass li " + idx);
    }
  },
  components: {
    BTooltip
  },
  
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
