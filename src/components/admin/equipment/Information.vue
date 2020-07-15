<template>
  <div class="py-3">
    <!-- <h1 class="text-center mb-4">"设备概要信息"</h1> -->

    <div v-if="brief.ready">
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

      <div class="row pt-3">
        <div class="col-md-4 mb-3" v-for="(card,idx) in cards" v-bind:key="idx">
          <Briefcard
            v-bind:class="card.showBorder?card.borderCls:'border-0'"
            v-show="card.showMe"
            v-bind:title="card.title"
            v-bind:items="brief[card.name]"
            v-on:evt-update-items="onEvtUpdateItems(card.plugStr,$event)"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-center text-warning mt-5">
      <h4>加载中...</h4>
      <b-spinner></b-spinner>
    </div>

    <b-collapse id="info" v-model="info.visible" class="mt-3">
      <div>
        <h5 class="text-center">
          <span class="px-2 py-1 bg-warning rounded">{{tblTitle}}</span>
        </h5>
        <div class="row pt-1">
          <div class="col-sm-4"></div>
          <div class="col-sm-4 text-center">
            <span v-if="tblSubTitle" class="text-muted">——{{tblSubTitle}}</span>
          </div>
          <div class="col-sm-4 text-right">
            <b-button
              class="mx-2"
              variant="outline-secondary"
              size="sm"
              aria-controls="info"
              v-bind:class="info.visible ? null : 'collapsed'"
              v-bind:aria-expanded="info.visible ? 'true' : 'false'"
              v-on:click="info.visible=!info.visible"
            >隐藏</b-button>
            <b-button variant="outline-primary" size="sm" v-on:click="resetTblInfo">重置</b-button>
          </div>
        </div>
      </div>

      <TheTable
        class="mt-1"
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
import { BSpinner, BCollapse, BButton, VBTooltip } from "bootstrap-vue";

import { asyFetch, getServUrl } from "@/utility/util";

//field字段内容渲染参数
const setFieldProp = (opt = {}) => {
  
  const optDefault = {
    status: false,
    th: { tag: "div", class: "text-center", txt: "", children: [] },
    td: { tag: "div", class: "text-center", txt: "", children: [] }
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

const infoDef = {
  tblName: "info",
  fields: {
    name: ["id","sn", "type", "name", "location", "status", "create_time"],
    prop: {
      sn: setFieldProp({
        th: { txt: "序列号", class: "text-left" },
        td: { 
          class: "text-left" ,id:'',
          children:[
            {tag: "b-tooltip", txt: "显示详情", class: "",target:""},
            {tag: "a",txt: "", class: "",id:""}
          ] 
        }
      }),
      type: setFieldProp({
        th: { txt: "类型" }
      }),
      name: setFieldProp({
        th: { txt: "名称" }
      }),
      location: setFieldProp({
        th: { txt: "地址" }
      }),
      status: setFieldProp({
        status: true,
        th: { txt: "状态"}
        //   children:[
        //     {tag: "b-tooltip", txt: "zzz", class: "",target:"btt"},
        //     {tag: "a", txt: "状态", class: ""}
        //   ] 
        // },
      }),
      create_time: setFieldProp({
        th: { txt: "记录时间" }
      })
    }
  }
};

//符合TP5链式查询模式的查询条件定义，是否有sql注入的可能？
// const tp5Query = {
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
      cards: [
        {
          name:'status',
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
            },
          }
        },
        {
          name:'type',
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
            },
          }
        },
        {
          name:'location',
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
            },            
          }
        }
      ],
      tblTitle: "设备信息概要表",
      tblSubTitle: "所有设备",
      brief: {
        ready: false,
        totalNum: 0,
        type:[],
        status:[],
        location:[]
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
          totalNum: { where: [["id", ">", "0"]] },
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
          where: [
            ["id", ">", "0"]
            // ['type',"like","镁%"]
          ],
          order: { create_time: "desc" }
        }
      };
      const obj = this.info;

      if (!obj.ready) {
        this.tblTitle = "设备信息概要表";
        this.tblSubTitle = "所有设备";

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
      const totalNum = this.brief.totalNum;
      const infoNum = this.info.items.length;

      this.setCardsShow();
      if (totalNum - infoNum) {
        this.info.ready = false;
        this.initDataInfo();
      }
    },
    updateItems: async function(plugStr, obj) {
      // $event.preventDefault;
      const tblTitle = "设备信息概要表";
      const [arr, txt] = [obj.idArr, obj.txt];
      // const totalNum = this.brief.totalNum;
      // const infoNum = this.info.items.length;

      this.info.visible = true;

      if (this.tblSubTitle != txt) {
        // if (totalNum - infoNum && this.tblSubTitle != txt) {
        this.info.ready = false;
        this.tblTitle = tblTitle + plugStr;
        this.tblSubTitle = txt;
        const reqOpt = {
          tblName: "info",
          items: [],
          fields: infoDef.fields.name,
          query: {
            where: [
              ["id", "in", arr]
              // type:["like","镁%"]
            ],
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
      // console.log(opt);
      // console.log(plugStr);
      this.setCardsShow(plugStr);
      this.updateItems(plugStr, opt);
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
