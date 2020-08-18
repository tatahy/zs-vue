<template>
  <div>
    <p class="text-right">
      <b-button variant='primary' class="m-1" v-on:click="getRes">刷新</b-button>
    </p>
    <div v-if="isReady">
      <h4 class="text-center">
        <span>{{equipment.info.name}} </span>
        <span v-bind:class="getStatusClsStr(equipment.info.status)">{{equipment.info.status}}</span>
        <h5 class="mt-2 text-muted">
          <span>——{{equipment.info.type}}</span>
          <span>，{{equipment.info.sn}}</span>
          <span>，{{equipment.info.location}}</span>
        </h5>
      </h4>

      <!-- <h5>{{equipment.info}}</h5> -->

      <!-- <h4 class="text-warning">Chart Area</h4> -->
      <div class="row pt-3">
        <div class="col-lg-6" v-for="(param,m) in equipment.params" v-bind:key="'card'+m">
          <TheChart
            class="mb-3"
            v-bind:chartId="'chart'+m"
            v-bind:chartType="'line'"
            v-bind:param="param"
            v-bind:isShow="m==0?true:false"
          />
        </div>
      </div>

      <!-- <h4>Data: {{equipment.data.length}}</h4>
      <div v-for="(obj,idx) in equipment.data" v-bind:key="'data'+idx">
        <span class="badge badge-primary font14px">{{idx+1}}</span>
        &nbsp;
        <span>{{typeof obj}}</span>

        <span>{{obj.data}}</span>
        <span>{{obj.create_time}}</span>
      </div>

      <h4>rawData: {{equipment.rawData.length}}</h4>
      <div v-for="(rawData,m) in equipment.rawData" v-bind:key="'rawData'+m">
        <span class="badge badge-secondary" v-bind:style="{'font-size':'14px'}">{{m+1}}</span>
        &nbsp;
        <span>{{typeof rawData}}</span>
        <span>{{rawData}}</span>

        <span
          v-for="([key,val],n) in Object.entries(rawData)"
          v-bind:key="'param'+n"
        >{{key+':'+val}}&nbsp;</span>

      </div>

      <h4>params: {{equipment.params.length}}</h4>
      <div v-for="(param,m) in equipment.params" v-bind:key="'params'+m">
        <span class="badge badge-info" v-bind:style="{'font-size':'14px'}">{{m+1}}</span>
        &nbsp;
        <span>{{param}}</span>
      </div>-->
    </div>

    <div v-else class="text-center">
      <b-spinner variant="primary" label="loading..."></b-spinner>
      <p class="text-center">数据传输中...</p>
    </div>
  </div>
</template>

<script>
import {
  BSpinner,
  // BCollapse,
  BButton,
  // VBTooltip,
  // VBToggle
} from "bootstrap-vue";

import { asyFetch, getServUrl } from "@/utility/util";

// const getPost = (id, cb) => {
//   console.log(id);
//   return cb;
// };

export default {
  name: "Chart",
  data() {
    return {
      // res: 'zzz',
      // query:this.$route.query,
      // url:new URL(window.location.href),
      loading: false,
      post: null,
      error: null,
      url: getServUrl(),
      isReady: false,
      equipment: {
        info: {},
        data: [],
        rawData: [],
        params: [
          {
            name: "",
            txt: "",
            timestamp: [],
            value: [],
          },
        ],
      },
      visible: false,
    };
  },
  // beforeRouteEnter(to, from, next) {

  //   console.log('beforeRouteEnter');
  //   console.log(to);
  //   console.log(from);

  //   getPost(to.query.info_id, (err, post) => {
  //     next((vm) => vm.setData(err, post));
  //   });
  // },
  computed: {
    query: function () {
      return {
        where: this.$route.query,
        order: { create_time: "desc" },
      };
    },
    chartShow: function () {
      return this.setChartShow();
    },
  },
  watch: {
    //监控url中query内容变化
    // "routeQuery": "getRes",
    chartShow: {
      handler: function () {
        return this.setChartShow();
      },
      immediate: true,
    },
  },
  methods: {
    setChartShow: function () {
      const arr = [];
      const params = this.equipment.params;

      if (params.length) {
        params.forEach((obj, idx) => {
          if (obj.timestamp.length && obj.value.length) {
            arr[idx] = true;
          }
        });
      }

      return arr;
    },
    getStatusClsStr(status){
      const pre='badge badge-';
      const obj={'正常':'success','离线':'warning'};
      return Object.keys(obj).includes(status)?pre+obj[status]:'';
    },
    fetchTblData: async function () {
      const reqDefault = {
        tblName: "data_raw",
        query: {
          fields: [],
          where: "",
          page: "",
        },
      };
      //合并vue Router中的查询条件
      const req = Object.assign({}, reqDefault, { query: this.query });
      // const req = Object.assign({}, reqDefault, {where:this.routeQuery});

      const opt = { method: "POST", body: JSON.stringify(req) };
      const url = this.url + "equipment/chart";
      return await asyFetch(url, opt);
    },
    setData(err, post) {
      if (err) {
        this.error = err.toString();
      } else {
        this.post = post;
      }
    },
    getRes: async function () {
      this.isReady = false;
      const obj = await this.fetchTblData();
      if (obj.ok) {
        this.isReady = true;
        this.equipment = Object.assign({}, this.equipment, obj.cont.items);
      }
    },
  },
  components: {
    BSpinner,
    BButton,
    // BCollapse,
    // TheTable: () => import("./TheTable.vue"),
    TheChart: () => import("@/components/admin/TheChart.vue"),
  },
  mounted() {
    this.getRes();
    // this.setChartShow();
  },
};
</script>

<style scoped>
.font14px {
  font-size: 14px;
}
.hover-pointer:hover {
  cursor: pointer;
}
</style>
