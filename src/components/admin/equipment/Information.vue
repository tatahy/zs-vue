<template>
  <div>
    <h1 class="text-center mb-4">"设备概要信息"</h1>

    <div v-if="brief.ready" class="mt-2">
      <h4 class="text-center">
        设备总数
        <b-button
          variant="primary"
          size="sm"
          aria-controls="info"
          v-bind:class="info.visible ? null : 'collapsed'"
          v-bind:aria-expanded="info.visible ? 'true' : 'false'"
          v-on:click="info.visible=!info.visible"
          v-b-tooltip.hover
          title="显示/隐藏信息表"
        >
          <strong>{{brief.totalNum}}</strong>
        </b-button>
      </h4>

      <div class="row pt-2">
        <div class="col-md-4 mb-3" v-for="(card,idx) in cards" v-bind:key="idx">
          <Briefcard
            v-bind:class="card.showBorder?card.borderCls:'border-0'"
            v-show="card.showMe"
            v-bind:title="card.title"
            v-bind:reqOpt="card.reqOpt"
            v-on:evt-update-items="onEvtUpdateItems(card.plugStr,$event)"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-center text-warning">
      <h4>加载中...</h4>
      <b-spinner></b-spinner>
    </div>

    <b-collapse id="info" v-model="info.visible" class="mt-2">
      <blockquote class="blockquote text-center">
        <div class="d-flex justify-content-center">
          <span>{{tblTitle}}&nbsp;</span>
          <b-button
            class="mx-2"
            variant="outline-secondary"
            size="sm"
            aria-controls="info"
            v-bind:class="info.visible ? null : 'collapsed'"
            v-bind:aria-expanded="info.visible ? 'true' : 'false'"
            v-on:click="info.visible=!info.visible"
          >隐藏</b-button>
          <b-button
            variant="outline-primary"
            size="sm"
            v-show="showBtnReset"
            v-on:click="resetTblInfo"
          >重置</b-button>
        </div>
        <footer v-if="tblSubTitle" class="blockquote-footer">{{tblSubTitle}}</footer>
      </blockquote>

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

const setTagClr = tag => {
  const clrObj = {
    "100": "secondary",
    "200": "success",
    "400": "danger",
    "500": "warning"
  };

  const preObj = {
    span: "px-2 alert-",
    borderLeft: "pl-2 border-left border-"
  };

  if (Object.keys(preObj).includes(tag)) {
    for (let prop in clrObj) {
      clrObj[prop] = preObj[tag] + clrObj[prop];
    }
  }
  return clrObj;
};

//符合TP5链式查询模式的查询条件定义，是否有sql注入的可能？
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
  name: "Information",
  data() {
    return {
      urlBase: getServUrl() + "equipment/",
      spanClr: setTagClr("span"),
      borderLeftClr: setTagClr("borderLeft"),
      cards: [
        {
          title: "设备状态",
          plugStr: "(状态)",
          showMe: true,
          showBorder: false,
          borderCls: "border-info",
          reqOpt: {
            tblName: "info",
            fields: ["id", "status"],
            query: {
              // items: { where: { id: [">", "0"] },  group: "status" },
              // group: { group: "status" }
              status: { group: "status" }
              // group:  "status"
            }
          }
        },
        {
          title: "设备类型",
          plugStr: "(类型)",
          showMe: true,
          showBorder: false,
          borderCls: "border-secondary",
          reqOpt: {
            tblName: "info",
            fields: ["id", "type"],
            query: {
              //  items: { where: { id: [">", "0"] },  group: "type" },
              // group: { group: "type" }
              type: { group: "type" }
              // group:"type"
            }
          }
        },
        {
          title: "分布地域",
          plugStr: "(地域)",
          showMe: true,
          showBorder: false,
          borderCls: "border-primary",
          reqOpt: {
            tblName: "info",
            fields: ["id", "location"],
            query: {
              //  items: { where: { id: [">", "0"] },  group: "location" },
              // group: { group: "location" }
              location: { group: "location" }
              // group: "location"
            }
          }
        }
      ],
      tblTitle: "设备信息概要表",
      tblSubTitle: "",
      brief: {
        totalNum: 0,
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
  computed: {
    showBtnReset: function() {
      const totalNum = this.brief.totalNum;
      const infoNum = this.info.items.length;

      return totalNum - infoNum ? true : false;
    }
  },
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
      const obj = this.brief;

      if (!obj.ready) {
        const res = await this.fetchTbData("brief", reqOpt);
        if (res.ok) {
          const resItems = res.cont.items;
          for (let name in reqOpt.query) {
            obj[name] = resItems[name];
          }

          obj.ready = true;
        }
      }
    },
    initDataInfo: async function() {
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

      if (!obj.ready) {
        this.tblTitle = "设备信息概要表";
        this.tblSubTitle = "";

        const res = await this.fetchTbData("info", reqOpt);

        if (res.ok) {
          obj.fields = res.cont.fields;
          obj.items = res.cont.items;
          obj.ready = true;
          // console.log(this.info);
        }
      }
    },
    resetTblInfo: function() {
      this.info.ready = false;
      this.setCardsShow();
      this.initDataInfo();
    },
    updateItems: async function(plugStr, obj) {
      // $event.preventDefault;
      const tblTitle = "设备信息摘要表";
      const [arr, txt] = [obj.idArr, obj.txt];

      this.info.visible = true;

      if (this.tblSubTitle != txt) {
        this.info.ready = false;
        this.tblTitle = tblTitle + plugStr;
        this.tblSubTitle = "";
        const reqOpt = {
          tblName: "info",
          items: [],
          fields: infoDef.fields.name,
          query: {
            where: {
              id: ["in", arr]
              // type:["like","镁%"]
            },
            order: { create_time: "desc" }
          }
        };
        const res = await this.fetchTbData("info", reqOpt);

        // console.log($evt);

        if (res.ok) {
          this.info.items = res.cont.items;
          this.info.ready = true;
          // console.log(this.info);
        }

        this.info.ready = true;
        this.tblSubTitle = txt;
      }
    },
    setCardsShow(plugStr = "") {
      this.cards.forEach(el => {
        el.showMe = true;
        el.showBorder = false;
      });
      if (plugStr) {
        this.cards.forEach(el => {
          el.showMe = el.plugStr === plugStr ? true : false;
          el.showBorder = el.plugStr === plugStr ? true : false;
        });
      }
    },
    onEvtUpdateItems(plugStr, opt) {
      this.setCardsShow(plugStr);
      this.updateItems(plugStr, opt);
      // console.log(opt);
    }
  },
  components: {
    BSpinner,
    BCollapse,
    BButton,
    TheTable: () => import("@/components/admin/TheTable.vue"),
    Briefcard: () => import("@/components/admin/equipment/Briefcard.vue")
  },
  directives: {
    "b-tooltip": VBTooltip
  },
  created() {
    this.initDataInfo();

    this.getDataBrief();
  }
};
</script>

<style scoped>
</style>
