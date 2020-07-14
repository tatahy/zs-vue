<template>
  <div>
    <h1 class="text-center">"终端采集的数据"</h1>

    <div>
 
      <template v-if="rawData.ready">
        <TheTable
          head-bg="bg-info"
          v-bind:fields="rawData.fields"
          v-bind:fieldsChn="rawData.fieldsChn"
          v-bind:items="rawData.items"
        />
        <h4 
          v-if="rawData.items.length==0" 
          class="text-center mt-5"
        >
        <span class="alert alert-primary">无数据 </span>
        </h4>
      </template>

      <div v-else class="text-center">
        <b-spinner variant="primary" label="loading..."></b-spinner>
      </div>
    </div>

    <!-- <p>
      resData:
      <br />
      {{resData}}
    </p>-->

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
        //定义表头字段值和顺序
        fields: [
          "info_id",
          "terminal_sn",
          "data",
          "create_time",
          "module_info",
          "module_time"
        ],
        fieldsChn: {
          info_id: "终端编号",
          terminal_sn: "终端序列号",
          data: "采集数据",
          create_time: "记录时间",
          module_info: "模块信息",
          module_time: "模块时间"
        },
        items: [],
        ready: false
      },
      resData: ""
    };
  },
  methods: {
    initDataVal: async function() {
      const obj = this.rawData;
      const res = await this.fetchTbData(obj);
      const getOverlap = (arr1, arr2) => {
        let arr = [];
        arr1.forEach(el => {
          if (arr2.includes(el)) {
            arr.push(el);
          }
        });
        return arr;
      };

      if (res.ok) {
        obj.fields = getOverlap(obj.fields, res.cont.fields);
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
      //vue Router中的查询条件
      const routerQuery = this.$router.history.current.query;
      query = Object.assign({}, queryDefault, query, routerQuery);
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
    this.initDataVal();
  }
};
</script>

<style scoped>
</style>
