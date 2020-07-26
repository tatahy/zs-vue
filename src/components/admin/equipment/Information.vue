<template>
  <div class="py-3">

    <div v-if="brief.ready">
      <h4 class="text-center">
        设备总数
        <b-button variant="primary" size="sm" v-b-toggle.info v-b-tooltip.hover title="显示/隐藏信息表">
          <strong>{{brief.totalNum}}</strong>
        </b-button>
      </h4>

      <div class="row pt-3">
        <div class="col-md-4 mb-3" v-for="(card,idx) in cards" v-bind:key="idx">
          <Briefcard
            v-bind:class="card.showBorder?card.borderCls:'border-0'"
            v-show="card.showMe"
            v-bind:isShow="idx==0?true:false"
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

    <b-collapse id="info" class="mt-3" v-model="infoTbl.visible">
      <div>
        <h5 class="text-center">
          <span class="px-2 py-1 bg-warning rounded">{{infoTbl.title}}</span>
        </h5>
        <div class="row pt-1">
          <div class="col-sm-4"></div>
          <div class="col-sm-4 text-center">
            <span v-if="infoTbl.subTitle" class="text-muted">——{{infoTbl.subTitle}}</span>
          </div>
          <div class="col-sm-4 text-right">
            <b-button class="mx-2" variant="outline-secondary" size="sm" v-b-toggle.info>隐藏</b-button>
            <b-button variant="outline-primary" size="sm" v-on:click="resetTblInfo">重置</b-button>
          </div>
        </div>
      </div>

      <TheTable
        class="mt-1"
        head-bg="bg-warning"
        v-if="infoTbl.ready"
        v-bind:fields="infoTbl.fields"
        v-bind:fieldsProp="infoTbl.fieldsProp"
        v-bind:items="infoTbl.items"
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
  VBTooltip,
  VBToggle
} from "bootstrap-vue";

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

const tableDef = {
  tblName: "info",
  fields: {
    name: ["id", "sn", "type", "name", "location", "status", "create_time"],
    prop: {
      sn: setFieldProp({
        th: { txt: "序列号", class: "text-left" },
        td: {
          class: "text-left",
          id: {name:'id',val:''},
          children: [
            { tag: "b-tooltip", txt: "显示详情", class: "", target: "" },
            { tag: "a", txt: "", class: "", id: "" ,href:'#/admin/equipment/data/?info_id='}
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
        th: { txt: "状态" }
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
          name: "status",
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
          name: "type",
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
          name: "location",
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
      brief: {
        ready: false,
        totalNum: 0,
        type: [],
        status: [],
        location: []
      },
      infoTbl: {
        title: "设备信息概要表",
        subTitle: "所有设备",
        fields: "",
        fieldsProp: tableDef.fields.prop,
        items: [],
        ready: false,
        visible:false
      },
      
    };
  },
  computed: {
    showBtnReset: function() {
      const totalNum = this.brief.totalNum;
      const infoNum = this.infoTbl.items.length;

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
        fields: tableDef.fields.name,
        query: {
          where: [
            ["id", ">", "0"]
            // ['type',"like","镁%"]
          ],
          order: { create_time: "desc" }
        }
      };
      const obj = this.infoTbl;

      if (!obj.ready) {
        obj.title = "设备信息概要表";
        obj.subTitle = "所有设备";

        const res = await this.fetchTbData("info", reqOpt);

        if (res.ok) {
          obj.fields = res.cont.fields;
          obj.items = res.cont.items;
          obj.ready = true;
          // console.log(this.infoTbl);
        }
      }
    },
    resetTblInfo: function() {
      const totalNum = this.brief.totalNum;
      const infoNum = this.infoTbl.items.length;

      this.setCardsShow();
      if (totalNum - infoNum) {
        this.infoTbl.ready = false;
        this.initDataInfo();
      }
    },
    updateItems: async function(plugStr, obj) {
      // $event.preventDefault;
      const [title, subTitle,idArr] = ["设备信息概要表", obj.txt,obj.idArr];
      const tbl=this.infoTbl;

      tbl.visible=true;
      
      // this.$root.$emit('bv::toggle::collapse', 'info');

      if (tbl.subTitle != subTitle) {
        
        tbl.ready = false;
        tbl.title = title + plugStr;
        tbl.subTitle = subTitle;

        const reqOpt = {
          tblName: "info",
          items: [],
          fields: tableDef.fields.name,
          query: {
            where: [
              ["id", "in", idArr]
              // type:["like","镁%"]
            ],
            order: { create_time: "desc" }
          }
        };
        const res = await this.fetchTbData("info", reqOpt);

        // console.log($evt);
        
        if (res.ok) {
          tbl.items = res.cont.items;
          tbl.ready = true;
        }

        tbl.ready = true;
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
    Briefcard: () => import("./Briefcard.vue")
  },
  directives: {
    "b-tooltip": VBTooltip,
    "b-toggle": VBToggle
  },
  created() {
    this.initDataInfo();

    this.getDataBrief();
  }
};
</script>

<style scoped>
</style>
