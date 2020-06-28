<template>
  <div >
    <h1 class="text-center">"设备概要信息"</h1>
    <div class="mt-3">
        <TheTable 
        head-bg="bg-warning" 
        v-if="info.ready" 
        v-bind:fields="info.fields" 
        v-bind:fieldsChn="info.fieldsChn"
        v-bind:items="info.items" 
      
      />

      <div v-else class="text-center">
        <b-spinner variant="warning" ></b-spinner>
      </div>
    </div>
    
  </div>
</template>

<script>
import { BSpinner } from "bootstrap-vue";

import { asyFetch, getServUrl } from "@/utility/util";

// const info={

// };

export default {
  name: "EquipmentInfo",
  data() {
    return {
      url: getServUrl(),
      info: {
        tbName: "info",
        // tbName: "data_raw",
        fields: [],
        fieldsChn: {
          sn:'序列号',
          type:'类型',
          name:'名称',
          location:'地址',
          status:'状态',
          create_time:'记录时间',
        },
        items: [],
        ready: false,
        query:{
          where:[
            {name:'id',operator:'>',val:'0'},
          ],
          order:[
            {name:'id',val:'asc'}
          ],
          limit:0,
          page:{currentPage:'1',items:'10'},
          
        }
      },
    };
  },
  methods: {
    initDataVal: async function() {
      const obj=this.info;
      const res = await this.fetchTbData();

      if (res.ok) {
        obj.fields = res.cont.fields;
        obj.items = res.cont.items;
        obj.ready = true;
      }
    },
    // fetchTbData: async function(query) {
    //   const queryDefault = {
    //     tbName: "info",
    //     fields: [],
    //     where: "",
    //     page: ""
    //   };
    //   query = Object.assign({}, queryDefault, query);
    fetchTbData: async function() {

      const opt = { method: "POST", body: JSON.stringify(this.info) };
      // const url = this.url + "terminal";
      const url = this.url + "equipment/"+this.info.tbName;

      return await asyFetch(url, opt);
    }
  },
  components: {
    BSpinner,
    // TheArrayList: () => import("@/components/admin/emqx-test/TheArrayList.vue"),
    TheTable: () => import("@/components/admin/TheTable.vue")
  },
  created() {
    // this.initData();
    // this.initDataVal(this.info);
    this.initDataVal();
  }
};
</script>

<style scoped>
</style>
