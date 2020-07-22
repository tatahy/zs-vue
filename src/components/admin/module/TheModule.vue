<template>
  <div>
    <h1 class="text-center">"Form区"</h1>

    <h1 class="text-center">"Chart区"</h1>
    <p>
      Group by "info_id"
    </p>
    <div>
      <template v-if="groups.ready">
        <TheTable
          head-bg="bg-dark text-light"
          v-bind:fields="groups.fields"
          v-bind:fieldsChn="groups.fieldsChn"
          v-bind:items="groups.items"
        />
        <h4 v-if="groups.items.length==0" class="text-center mt-5">
          <span class="alert alert-primary">无数据</span>
        </h4>
      </template>
      <div v-else class="text-center">
        <b-spinner variant="secondary" label="loading..."></b-spinner>
      </div>
    </div>

    <h1 class="text-center">"Table区"</h1>

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
import {
  BSpinner,
  // BCollapse,
  // BButton
  // VBTooltip,
  // VBToggle
} from "bootstrap-vue";

import { asyFetch, getServUrl } from "@/utility/util";

// const info={

// };

export default {
  name: "TheModule",
  data() {
    return {
      url: getServUrl(),
      rawData: {
        tblName: "data_raw",
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
      req: null,
      groups: {
        fields: ["info_id", "sn","type","name","customer_id","location","data",],
        fieldsChn: {
          info_id: "设备编号",
          sn:"设备序列号",
          type:"设备类型",
          name:"设备名称",
          customer_id:"客户编号",
          location:"设备所在地",
          data: "采集数据"
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
        this.initData();
      }
      return query;
    }
  },
  methods: {
    initData: async function() {
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
      this.req = Object.assign({}, obj);
      const res = await this.fetchTbData("terminal");

      if (res.ok) {
        obj.fields = getOverlap(obj.fields, res.cont.fields);
        obj.items = res.cont.items;
        obj.ready = true;
      }
    },
    fetchTbData: async function(routeStr) {
      const routeArr = ["terminal", "equipment/group"];
      const reqDefault = {
        tblName: "info",
        fields: [],
        where: "",
        page: ""
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
    initGroups: async function() {
      // console.log('haah');
      const req = {
        tblName: "data_raw",
        query: {
          group: "info_id"
        }
        // fields: [],
        // where: "",
        // page: ""
      };
      const groups=this.groups;

      this.req = Object.assign({}, req);
      const res = await this.fetchTbData("equipment/group");

      if (res.ok) {
        groups.items = res.cont.items;
        groups.ready=true;
      }
    }
  },
  components: {
    BSpinner,
    // BButton,
    TheTable: () => import("./TheTable.vue")
    // TheTable: () => import("@/components/admin/TheTable.vue")
  },
  created() {
    this.initData();
    this.initGroups();
  }
};
</script>

<style scoped>
</style>
