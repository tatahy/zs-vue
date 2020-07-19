<template>
  <div>
    <h4 class="text-center">"接收的设备数据"</h4>

    <div>
      <template v-if="rawData.ready">
        <TheTable
          head-bg="bg-info"
          v-bind:fields="rawData.fields"
          v-bind:fieldsChn="rawData.fieldsChn"
          v-bind:items="rawData.items"
        />
        <h4 v-if="rawData.items.length==0" class="text-center mt-5">
          <span class="alert alert-primary">无数据</span>
        </h4>
      </template>

      <div v-else class="text-center">
        <b-spinner variant="primary" label="loading..."></b-spinner>
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
      }
    };
  },
  computed: {
    routeQuery: function() {
      return this.$route.query;
    }
  },
  watch: {
    //监控url中query内容变化
    routeQuery: function() {
      const query = Object.assign({}, this.$route.query);
      // 路由发生变化
      if (!Object.keys(query).length) {
        this.initDataVal();
      }
      return query;
    }
  },
  methods: {
    initDataVal: async function() {
      //得到2个数组的合集
      const getOverlap = (arr1, arr2) => {
        let arr = [];
        arr1.forEach(el => {
          if (arr2.includes(el)) {
            arr.push(el);
          }
        });
        return arr;
      };

      const obj = this.rawData;
      obj.ready = false;
      obj.items = [];

      const queryDefault = {
        tbName: "info",
        fields: [],
        where: "",
        page: ""
      };
      const query=Object.assign({},queryDefault,obj,this.routeQuery);
      const opt = { method: "POST", body: JSON.stringify(query) };
      const url = this.url + "terminal";
      const res = await asyFetch(url, opt);
      
      // console.log(this.$route);

      if (res.ok) {
        obj.fields = getOverlap(obj.fields, res.cont.fields);
        obj.items = res.cont.items;
        obj.ready = true;
      }
    },
  },
  components: {
    BSpinner,
    // TheArrayList: () => import("@/components/admin/emqx-test/TheArrayList.vue"),
    TheTable: () => import("./TheTable.vue")
  },
  created() {
    this.initDataVal();
  }
};
</script>

<style scoped>
</style>
