<template>
  <div>
    <!-- <h1 class="text-center">"Form区"</h1> -->
 
    <h1 class="text-center mb-3">设备采集数据类型</h1>
    <!-- <p>Group by "info_id"</p> -->
    <div>
      <template v-if="tblGroups.ready">
        <TheTable
          class="mt-1"
          head-bg="bg-dark text-light"
          v-bind:fields="tblGroups.fields.name"
          v-bind:fieldsProp="tblGroups.fields.prop"
          v-bind:items="tblGroups.items"
        />

        <h4 v-if="tblGroups.items.length==0" class="text-center mt-5">
          <span class="alert alert-primary">无数据</span>
        </h4>
      </template>
      <div v-else class="text-center">
        <b-spinner variant="secondary" label="loading..."></b-spinner>
        <p class="text-center">数据传输中...</p>
      </div>
    </div>

    <!-- <h1 class="text-center">"Table区"</h1>

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
    </div>-->
  </div>
</template>

<script>
import {
  BSpinner,
  // BCollapse,
  // BButton
  // VBTooltip,
  // VBToggle
} from "bootstrap-vue";

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

const tblGroupsDef = {
  fields: {
    name: [
      // "info_id",
      "sn",
      "type",
      "name",
      // "customer_id",
      "location",
      "status",
      // "create_time",
      "data",
    ],
    prop: {
      info_id: setFieldProp({
        th: { txt: "设备编号" },
      }),
      sn: setFieldProp({
        th: { txt: "设备序列号" },
      }),
      type: setFieldProp({
        th: { txt: "设备类型" },
      }),
      name: setFieldProp({
        th: { txt: "设备名称" },
      }),
      customer_id: setFieldProp({
        th: { txt: "客户编号" },
      }),
      location: setFieldProp({
        th: { txt: "设备所在地" },
      }),
      status: setFieldProp({
        th: { txt: "设备现状" },
      }),
      create_time: setFieldProp({
        th: { txt: "设备注册时间" },
      }),
      data: setFieldProp({
        th: { txt: "采集数据类型", class: "text-center" },
        td: {
          class: "text-center",
          id: { name: "info_id", val: "" },
          route: { name: "equipment-chart", query: {} },
          txt: "",
          children: [
            { tag: "a", class: "", id: "", href: "javascript()" },
            { tag: "b-tooltip", txt: "显示详情", class: "", target: "" },
          ],
        },
      }),
    },
  },
  items: [],
  ready: false,
};

export default {
  name: "TheModule",
  data() {
    return {
      url: getServUrl(),
      tblRawData: tblRawDataDef,
      tblGroups: tblGroupsDef,
      req: null,
    };
  },
  computed: {
    routeQuery: function () {
      return this.$route.query;
    },
  },
  watch: {
    //监控url中query内容变化
    routeQuery: function () {
      const query = Object.assign({}, this.$route.query);
      // 路由发生变化
      if (!Object.keys(query).length) {
        this.initData();
      }
      return query;
    },
  },
  methods: {
    fetchTblData: async function (routeStr) {
      const routeArr = ["terminal", "equipment/group"];
      const reqDefault = {
        tblName: "info",
        fields: [],
        where: "",
        page: "",
      };
      //合并vue Router中的查询条件
      const req = Object.assign({}, reqDefault, this.req, this.routeQuery);
      const opt = { method: "POST", body: JSON.stringify(req) };
      const url = routeArr.includes(routeStr)
        ? this.url + routeStr
        : this.url + routeArr[0];
      // const url = this.url + "equipment/data";
      return await asyFetch(url, opt);
    },
    initData: async function () {
      const data = this.tblRawData;
      data.ready = false;
      data.items = [];

      this.req = null;
      this.req = {
        tblName: "data_raw",
        fields: data.fields.name,
        // where: "",
        // page: ""
      };

      const res = await this.fetchTblData("terminal");

      if (res.ok) {
        data.items = res.cont.items;
        data.ready = true;
      }
    },
    initGroups: async function () {
      const groups = this.tblGroups;
      this.req = null;
      this.req = {
        tblName: "data_raw",
        query: {
          group: "info_id",
        },
        // fields: [],
        // where: "",
        // page: ""
      };
      const res = await this.fetchTblData("equipment/group");

      if (res.ok) {
        groups.items = res.cont.items;
        groups.ready = true;
      }

      if (groups.items.length) {
        // groups.items.forEach(el => {
        // });
      }
    },
  },
  components: {
    BSpinner,
    // BButton,
    // TheTable: () => import("./TheTable.vue"),
    TheTable: () => import("@/components/admin/TheTable.vue"),
  },
  created() {
    this.initData();
    this.initGroups();
  },
};
</script>

<style scoped>
</style>
