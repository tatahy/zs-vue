<template>
  <div>
    <h1 class="text-center mb-4">"设备概要信息"</h1>

    <div v-if="info.ready">
      <b-card-group deck>
        <b-card no-body border-variant="primary" align="center">
          <template v-slot:header>
            <h5 class="mb-0">分布地域</h5>
          </template>
          <!-- <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text> -->
          <b-list-group flush>
            <b-list-group-item href="#" v-for="(val,idx) in brief.location" v-bind:key="idx">{{val}}</b-list-group-item>
          </b-list-group>
        </b-card>

        <b-card no-body border-variant="secondary" align="center">
          <template v-slot:header>
            <h5 class="mb-0">设备类型</h5>
          </template>
          <!-- <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text> -->
          <b-list-group flush>
            <b-list-group-item href="#" v-for="(val,idx) in brief.type" v-bind:key="idx">{{val}}</b-list-group-item>
          </b-list-group>
        </b-card>

        <b-card no-body border-variant="success" align="center">
          <template v-slot:header>
            <h5 class="mb-0">设备状态</h5>
          </template>
          <!-- <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text> -->
          <b-list-group flush>
            <b-list-group-item href="#" v-for="(val,idx) in brief.status" v-bind:key="idx">{{val}}</b-list-group-item>
          </b-list-group>
        </b-card>

        <b-card
          border-variant="primary"
          header-bg-variant="primary"
          header-text-variant="white"
          align="center"
        >
          <template v-slot:header>
            <h5 class="mb-0">设备总数</h5>
          </template>

          <!-- <b-card-body> -->
          <b-card-text>
            <b-button
              v-bind:class="info.visible ? null : 'collapsed'"
              v-bind:aria-expanded="info.visible ? 'true' : 'false'"
              aria-controls="info"
              v-on:click="info.visible=!info.visible"
              variant="primary"
              v-b-tooltip.hover title="显示/隐藏信息表"
            >{{brief.totalNum}}</b-button>
          </b-card-text>
          <!-- </b-card-body> -->
        </b-card>
      </b-card-group>
    </div>

    <div v-else class="text-center text-warning">
      <h4>
        加载中...
        <b-spinner></b-spinner>
      </h4>
    </div>

    <b-collapse id="info" v-model="info.visible" class="mt-5">
      <h3 class="text-center">设备信息概要表

        <b-button
              v-bind:class="info.visible ? null : 'collapsed'"
              v-bind:aria-expanded="info.visible ? 'true' : 'false'"
              aria-controls="info"
              v-on:click="info.visible=!info.visible"
              variant="outline-secondary"
            >隐藏</b-button>
      </h3>

      <TheTable
        head-bg="bg-warning"
        v-if="info.ready"
        v-bind:fields="info.fields"
        v-bind:fieldsProp="info.fieldsProp"
        v-bind:items="info.items"
      />

      <div v-else class="text-center text-warning">
        加载中...
        <b-spinner></b-spinner>
      </div>
    </b-collapse>
  </div>
</template>

<script>
import {
  BSpinner,
  BCollapse,
  BButton,
  BCard,
  BCardText,
  // BCardBody,
  BCardGroup,
  // BBadge,
  BListGroup,
  BListGroupItem,
  VBTooltip
} from "bootstrap-vue";

import { asyFetch, getServUrl } from "@/utility/util";

// const info={

// };
const setFieldProp = (str, opt) => {
  const optDefault = {
    txt: str,
    thClass: "text-center",
    tdClass: "text-center",
    status: false
  };

  return Object.assign({}, optDefault, opt);
};

const infoDef = {
  tblName: "info",
  fields: {
    name: ["sn", "type", "name", "location", "status", "create_time"],
    prop: {
      sn: setFieldProp("序列号", {
        thClass: "text-left",
        tdClass: "text-left"
      }),
      type: setFieldProp("类型"),
      name: setFieldProp("名称"),
      location: setFieldProp("地址"),
      status: setFieldProp("状态", {
        status: true
      }),
      create_time: setFieldProp("记录时间")
    }
  }
};

//符合TP5链式查询模式的查询条件，是否有sql注入的可能？
// const tp5Query = {
//   where: {
//     id: [">", "0"]
//     // type:["like","镁%"]
//   },

//   // where: [
//   //   ["id", ">", "0"]
//   //   ['type',"like","镁%"]
//   // ],

//   order: { create_time: "desc" }
//   // group: "location",

//   // limit: "",

//   // page: { currentPage: "1", items: "10" }
// };

export default {
  name: "EquipmentInfo",
  data() {
    return {
      urlBase: getServUrl() + "equipment/",
      brief: {
        totalNum: 0,
        type: [],
        location: [],
        status: [],
        ready: false
      },
      info: {
        fields: "",
        fieldsProp: infoDef.fields.prop,
        items: [],
        ready: false,
        visible: false
      }
    };
  },
  computed: {},
  methods: {
    fetchTbData: async function(api, param) {
      const opt = { method: "POST", body: JSON.stringify(param) };
      // const url = this.url + "terminal";
      const url = this.urlBase + api;

      return await asyFetch(url, opt);
    },
    getDataBrief: async function() {
      const reqOpt = {
        tblName: "info",
        query: {
          totalNum: { where: { id: [">", "0"] } },
          type: { group: "type" },
          location: { group: "location" },
          status: { group: "status" }
        }
      };
      const res = await this.fetchTbData("brief", reqOpt);
      if (res.ok) {
        const resItems = res.cont.items;
        for (let name in reqOpt.query) {
          this.brief[name] = resItems[name];
        }

        this.brief.ready = true;
      }
    },
    getDataInfo: async function() {
      const reqOpt = {
        tblName: "info",
        items: [],
        fields: infoDef.fields.name,
        query: {
          where: {
            id: [">", "0"]
            // type:["like","镁%"]
          },
          order: { create_time: "desc" }
        }
      };
      const obj = this.info;
      const res = await this.fetchTbData("info", reqOpt);

      if (res.ok) {
        obj.fields = res.cont.fields;
        obj.items = res.cont.items;
        obj.ready = true;
        // console.log(this.info);
      }
    }
  },
  components: {
    BSpinner,
    BCollapse,
    BButton,
    BCard,
    BCardText,
    // BCardBody,
    BCardGroup,
    // BBadge,
    BListGroup,
    BListGroupItem,
    TheTable: () => import("@/components/admin/TheTable.vue")
  },
  directives:{
    'b-tooltip':VBTooltip
  },
  created() {
    if (!this.info.ready) {
      this.getDataInfo();
    }
    if (!this.brief.ready) {
      this.getDataBrief();
    }
  }
};
</script>

<style scoped>
</style>
