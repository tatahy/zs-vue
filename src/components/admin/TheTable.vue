<template>
  <div class="table-responsive">
    <table v-bind:class="`table table-hover ${tbClass}`">
      <thead v-bind:class="headBg">
        <!-- <thead class="thead-light"> -->
        <tr>
          <th v-for="(val,idx) in fields" v-bind:key="idx">
            <!-- // val字段有渲染参数 -->
            <template v-if="fieldsProp.hasOwnProperty(val)">
              <!-- <div v-bind:class="fieldsProp[val]['thClass']">{{fieldsProp[val]['txt']}}</div> -->
              
              <TheTableCell v-bind:opt="fieldsProp[val]['th']"/>
            </template>
            <!-- // val字段无渲染参数 -->
            <template v-else>{{val}}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(itm,m) in items" v-bind:key="m">
          <td v-for="(val,n) in fields" v-bind:key="n">
            <!-- // val字段有渲染参数 -->
            <template v-if="fieldsProp.hasOwnProperty(val) ">
              <!-- // 单元格内容要添加内容对应的格式 -->
              <!-- <div v-bind:class="fieldsProp[val]['tdClass']">
                <span
                  v-bind:class="fieldsProp[val]['status']?setStatusCls(itm[val]):''"
                >{{itm[val]}}</span> -->
                <TheTableCell v-bind:opt="Object.assign({},fieldsProp[val]['td'],{txt:itm[val],id:`${itm['id']}`})"/>
              <!-- </div> -->
               
            </template>
            <!-- // 单元格内容要显示为<a>标签-->
            <!-- <template v-else-if="">
                <a id="" >{{itm[val]}}</a>
                <b-tooltip v-bind:target="`tooltip-li-${obj.value}-${idx}`" variant="info">点击显示详细信息</b-tooltip>
            </template>-->

            <!-- // val字段无渲染参数 -->
            <template v-else>{{itm[val]}}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import {// BTooltip,
// // VBTooltip
// }"bootstrap-vue";



export default {
  name: "TheTable",
  props: {
    tbClass: {
      type: String
      // default: ""
    },
    headBg: {
      type: String,
      default: "thead-light"
    },
    fields: {
      type: Array,
      required: true
    },
    fieldsProp: {
      type: Object,
      default: function() {
        return {};
      }
    },
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    setStatusCls(str) {
      
      const pref = "px-2 alert-";
      const clsArr = [
        { txt: "正常", value: pref + "success" },
        { txt: "异常", value: pref + "danger" },
        { txt: "离线", value: pref + "warning" }
      ];
      let cls = "";

      for (let i = 0; i < clsArr.length; i++) {
        if (str === clsArr[i].txt) {
          cls = clsArr[i].value;
          break;
        }
      }

      return cls;
    }
    //根据th字段信息添加<a>标签
  },
  components: {
    // BTooltip
    TheTableCell:()=>import('@/components/admin/TheTableCell.vue')
  }
};
</script>