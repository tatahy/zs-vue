<template>
  <div class="table-responsive">
    <table class="table table-hover" v-bind:class="tbClass">
      <thead v-bind:class="headBg">
        <!-- <thead class="thead-light"> -->
        <tr>
          <th v-for="(name,idx) in fields" v-bind:key="idx">
            <!-- // val字段有渲染参数 -->
            <template v-if="fieldsProp.hasOwnProperty(name)">
              <!-- <div v-bind:class="fieldsProp[val]['thClass']">{{fieldsProp[val]['txt']}}</div> -->

              <TheTableCell v-bind:opt="fieldsProp[name]['th']" />
            </template>
            <!-- // val字段无渲染参数 -->
            <template v-else>{{name}}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(itm,m) in items" v-bind:key="m">
          <td v-for="(name,n) in fields" v-bind:key="n">
            <!-- // val字段有渲染参数 -->
            <template v-if="fieldsProp.hasOwnProperty(name) ">
              <!-- <TheTableCell
                v-bind:opt="Object.assign(
                  {},
                  fieldsProp[name]['td'],
                  {
                    txt:itm[name],
                    id:fieldsProp[name]['td'].hasOwnProperty('id')?{name:fieldsProp[name]['td']['id']['name'],val:itm[fieldsProp[name]['td']['id']['name']]}:null},
                  )"
              />-->
              <TheTableCell v-bind:opt="setTdOpt(itm,name,fieldsProp[name]['td'])" />
            </template>

            <!-- // val字段无渲染参数 -->
            <template v-else>{{itm[name]}}</template>
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
      type: String,
      // default: ""
    },
    headBg: {
      type: String,
      default: "thead-light",
    },
    fields: {
      type: Array,
      required: true,
    },
    fieldsProp: {
      type: Object,
      default: function () {
        return {};
      },
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    setTdOpt(item, field, tdOpt) {
      const idObj = Object.keys(tdOpt).includes("id")
        ? { name: tdOpt.id.name, val: item[tdOpt.id.name] }
        : null;
      const routeObj = Object.keys(tdOpt).includes("route")
        ? { name: tdOpt.route.name, query: { [idObj.name]: idObj.val } }
        : null;
      const tdOptDefault = {
        txt: item[field],
        id: idObj ,
        route: routeObj 
      };

      return Object.assign(
        {},
        tdOpt,
        tdOptDefault,
      );
    },
  },
  components: {
    // BTooltip
    TheTableCell: () => import("./TheTableCell.vue"),
  },
};
</script>