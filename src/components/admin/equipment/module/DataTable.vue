<template>
  <div>
    <h4 class="text-center">设备采集的数据</h4>

    <div>
      <template v-if="tblRawData.ready">
        <TheTable
          head-bg="bg-info"
          v-bind:fields="tblRawData.fields.name"
          v-bind:fieldsProp="tblRawData.fields.prop"
          v-bind:items="tblRawData.items"
        />
        <h4 v-if="tblRawData.items.length==0" class="text-center mt-5">
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

//field字段内容渲染参数
const setFieldProp = (opt = {}) => {
  const optDefault = {
    // status: false,
    th: { tag: "div", class: "text-left", txt: "", children: [] },
    td: { tag: "div", class: "text-left", txt: "", children: [] },
  };

  for (let name in optDefault) {
    if (name == "th" || name == "td") {
      opt[name] = Object.keys(opt).includes(name)
        ? Object.assign({}, optDefault[name], opt[name])
        : optDefault[name];
    }
  }

  return Object.assign({}, optDefault, opt);
};

const tblRawDataDef = {
  tblName: "data_raw",
  fields: {
    name: [
      "info_id",
      "terminal_sn",
      "data",
      "create_time",
      "module_info",
      "module_time",
    ],
    prop: {
      info_id: setFieldProp({
        th: { txt: "终端编号" },
      }),
      terminal_sn: setFieldProp({
        th: { txt: "终端序列号" },
      }),
      data: setFieldProp({
        th: { txt: "采集数据", class: "text-center" },
      }),
      create_time: setFieldProp({
        th: { txt: "记录时间" },
      }),
      module_info: setFieldProp({
        th: { txt: "模块信息" },
      }),
      module_time: setFieldProp({
        th: { txt: "模块时间" },
      }),
    },
  },
  items: [],
  ready: false,
};

export default {
  name: "DataTable",
  data() {
    return {
      url: getServUrl(),
      tblRawData: tblRawDataDef,
    };
  },
  computed: {
    routeQuery: function () {
      const pKey = "info_id";
      const query = Object.assign({}, this.$route.query);
      const obj = {};

      if (!Object.keys(query).includes(pKey)) {
        obj[pKey] = query.id;
        query.id = null;
      }

      return obj;
    },
  },
  watch: {
    //监控url中query内容变化
    // routeQuery: function() {
    //   const query = Object.assign({}, this.$route.query);
    //   // 路由发生变化
    //   if (!Object.keys(query).length) {
    //     this.initDataVal();
    //   }
    //   return query;
    // }
  },
  methods: {
    initDataVal: async function () {
      //得到2个数组的合集
      const getOverlap = (arr1, arr2) => {
        let arr = [];
        arr1.forEach((el) => {
          if (arr2.includes(el)) {
            arr.push(el);
          }
        });
        return arr;
      };

      const obj = this.tblRawData;
      obj.ready = false;
      obj.items = [];

      const queryDefault = {
        tblName: "info",
        fields: [],
        where: "",
        page: "",
      };
      const query = Object.assign(
        {},
        queryDefault,
        {
          tblName: obj.tblName,
          fields: obj.fields.name,
        },
        this.routeQuery
      );
      const opt = { method: "POST", body: JSON.stringify(query) };
      const url = this.url + "terminal";
      const res = await asyFetch(url, opt);

      // console.log(this.$route);

      if (res.ok) {
        obj.fields.name = getOverlap(obj.fields.name, res.cont.fields);
        obj.items = res.cont.items;
        obj.ready = true;
      }
    },
  },
  components: {
    BSpinner,
    TheTable: () => import("@/components/admin/TheTable.vue"),
  },
  created() {
    this.initDataVal();
  },
};
</script>

<style scoped>
</style>
