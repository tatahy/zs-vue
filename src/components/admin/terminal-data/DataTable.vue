<template>
  <div>
    <h1 class="text-center">"终端采集的数据"</h1>
    <div>
      <!-- <h5 class="text-warning">Terminals Info:</h5> -->
      <!-- table  -->
      <!-- <template v-if="info.ready">
        <TheArrayList
          v-bind:list-val="info.items"
          list-val-name="Info"
          col-length="2"
          align-vertical="start"
        />

        <TheTable v-bind:fields="info.fields" v-bind:items="info.items" />
      </template>-->

      <!-- <TheTable 
        head-bg="bg-warning text-center" 
        v-if="info.ready" 
        v-bind:fields="info.fields" 
        v-bind:fieldsChn="info.fieldsChn"
        v-bind:items="info.items" 
      
      />

      <div v-else class="text-center">
        <b-spinner variant="warning" label="loading..."></b-spinner>
      </div> -->
    </div>
    <br />
    <div>
      <!-- <h5 class="text-info">终端数据：</h5> -->
      <!-- charts -->
      <!-- <TheArrayList
        v-if="rawData.ready"
        v-bind:list-val="rawData.items"
        list-val-name="items"
        col-length="2"
        align-vertical="start"
      /> -->
       <TheTable 
        head-bg="bg-info" 
        v-if="rawData.ready" 
        v-bind:fields="rawData.fields" 
        v-bind:fieldsChn="rawData.fieldsChn"
        v-bind:items="rawData.items" 
      
      />

      <div v-else class="text-center">
        <b-spinner variant="primary" label="loading..."></b-spinner>
      </div>
    </div>

    <!-- <p>
      resData:
      <br />
      {{resData}}
    </p> -->

    <!-- <p>
      items:
      <br />
      {{items}}
    </p>-->
  </div>
</template>

<script>
import { BSpinner } from "bootstrap-vue";

import { asyFetch, getServUrl } from "@/utility/util";

// const info={

// };

export default {
  name: "DataTable",
  data() {
    return {
      url: getServUrl(),
      // info: {
      //   tbName: "info",
      //   fields: [],
      //   fieldsChn: {
      //     sn:'序列号',
      //     name:'名称',
      //     location:'地址',
      //     status:'状态',
      //     create_time:'记录时间',
      //   },
      //   items: [],
      //   ready: false
      // },
      rawData: {
        tbName: "data_raw",
        fields: ['info_id','terminal_sn','data','module_info','create_time'],
        fieldsChn: {
          info_id:'终端编号',
          terminal_sn:'终端序列号',
          data:'采集数据',
          create_time:'记录时间',
          module_info:'模块信息'
        },
        items: [],
        ready: false
      },
      resData: ""
    };
  },
  methods: {
    initDataVal: async function(obj) {
      const res = await this.fetchTbData(obj);

      if (res.ok) {
        obj.fields = res.cont.fields;
        obj.items = res.cont.items;
        obj.ready = true;
      }
    },
    fetchTbData: async function(query) {
      const queryDefault = {
        tbName: "info",
        fields: [],
        where: "",
        page: ""
      };
      query = Object.assign({}, queryDefault, query);
      const opt = { method: "POST", body: JSON.stringify(query) };
      const url = this.url + "terminal";

      return await asyFetch(url, opt);
    }
  },
  components: {
    BSpinner,
    // TheArrayList: () => import("@/components/admin/emqx-test/TheArrayList.vue"),
    TheTable: () => import("@/components/admin/terminal-data/TheTable.vue")
  },
  created() {
    // this.initData();
    // this.initDataVal(this.info);
    this.initDataVal(this.rawData);
  }
};
</script>

<style scoped>
</style>
