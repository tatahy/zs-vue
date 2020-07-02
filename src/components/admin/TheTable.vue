<template>
  <div class="table-responsive">
    <table v-bind:class="`table table-hover ${tbClass}`">
      <thead v-bind:class="headBg">
        <!-- <thead class="thead-light"> -->
        <tr>
          <th v-for="(val,idx) in fields" v-bind:key="idx">
            <template v-if="fieldsProp.hasOwnProperty(val)">
              <div v-bind:class="fieldsProp[val]['thClass']">{{fieldsProp[val]['txt']}}</div>
            </template>
            <template v-else>{{val}}</template>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(itm,m) in items" v-bind:key="m">
          <td v-for="(val,n) in fields" v-bind:key="n" >
            <template v-if="fieldsProp.hasOwnProperty(val) ">
              <div v-bind:class="fieldsProp[val]['tdClass']">
                <span v-bind:class="fieldsProp[val]['status']?setStatusCls(itm[val]):''">{{itm[val]}}</span>
              </div>
            </template>
            <template v-else>{{itm[val]}}</template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    setStatusCls(str){
      const clsArr=[
        {txt:'正常',value:'px-2 py-1 alert-success'},
        {txt:'异常',value:'px-2 py-1 alert-danger'},
        {txt:'离线',value:'px-2 py-1 alert-warning'},
      ];
      let cls='';
        
      for(let i=0;i<clsArr.length;i++){
        if(str===clsArr[i].txt){
          cls=clsArr[i].value;
          break;
        }
      }

      return cls;
    },

  }
};
</script>