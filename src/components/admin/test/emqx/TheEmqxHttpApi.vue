<template>
  <b-container fluid>
    <h3 class="text-center">Environment</h3>

    <TheArrayList 
      v-bind:list-val="nodeEnv" 
      list-val-name="nodeEnv"
      v-bind:upper-case="true" 
      align-vertical="center" 
    />

    <br />
    <h3 class="text-center" v-bind:class="`text-${themeCls}`">EmqX Http Api</h3>

    <b-row align-v="center">
      <b-col class="name-align">
        <b>EMQX REST API:</b>
      </b-col>

      <b-col class="text-left">
        <b-form-select v-model="selAPI" v-bind:options="selOpts" v-on:change="setHttpReq()"></b-form-select>
      </b-col>
    </b-row>

    <template v-if="selAPI">
      <b-row align-v="center">
        <b-col class="name-align">
          <b>Selected API value:</b>
        </b-col>
        <b-col class="text-left">{{selAPI}}</b-col>
      </b-row>
      <br />
      <p class="text-center">
        <b-button v-bind:variant="themeCls" v-on:click="getApiResult()">Get API Info</b-button>
      </p>
    </template>

    <template v-if="res.hasOwnProperty('ok')">
      <hr />
      <div>
        <h5>Request</h5>

        <TheArrayList 
          list-val-name="req"
          v-bind:list-val="req" 
          col-length="2" 
          align-vertical="start" 
        />
      </div>

      <div v-if="res.cont.data.length">
        <br />
        <h5>
          Response.cont:
          <b-badge v-bind:variant="themeCls">{{res.cont.data.length}}</b-badge>&nbsp;items
        </h5>
        <TheArrayList 
          list-val-name="res\cont\data"
          v-bind:sn-class="themeCls"
          v-bind:list-val="res.cont.data" 
          col-length="2"
        />
      </div>

      <div v-else>
        <br />
        <h5>Response</h5>
        <TheArrayList 
          v-bind:list-val="res" 
          list-val-name="res"
          col-length="2"
        />
      </div>
    </template>
  </b-container>
</template>

<script>
//引入BsV的component
import {
  // BFormSelect,
  BContainer,
  BRow,
  BCol,
  BButton,
  BFormSelect,
  BBadge
} from "bootstrap-vue";

import {asyFetch} from '@/utility/util';

export default {
  name: "TheEmqxHttpApi",
  // props: {
  //   msg: String
  // },
  data: function() {
    return {
      host: new URL(window.location.href),
      themeCls: "success",
      selAPI: null,
      req: { url: "", option: {} },
      res: {}
    };
  },
  computed: {
    nodeEnv() {
      let getPureUrl=()=>{
        let str=window.location.href;
        return str.indexOf('#')?str.slice(0,str.indexOf('#')):str;
      };
      
      return Object.assign({}, { title: process.title }, process.env, {
        server: getPureUrl()
      });
    },
    selOpts() {
      const preFix = "api/v4/";
      return [
        { text: "...选择API", value: null, disabled: true },
        {
          text: "List all API describe",
          value: { method: "GET", route: preFix }
        },
        {
          text: "List all Cluster",
          value: { method: "GET", route: preFix + "brokers" }
        },
        {
          text: "List all Clients in the Cluster",
          value: { method: "GET", route: preFix + "clients" }
        },
        {
          text: "List all Listeners of Cluster",
          value: { method: "GET", route: preFix + "listeners" }
        },
        {
          text: "List all routes(topics)",
          value: { method: "GET", route: preFix + "routes" }
        },
        {
          text: "Get the status of the node",
          value: { method: "GET", route: preFix + "nodes" }
        },
        {
          text: "Get all status data in the cluster",
          value: { method: "GET", route: preFix + "stats" }
        },
        {
          text: "Get all plugins in the cluster",
          value: { method: "GET", route: preFix + "plugins" }
        },
        // {text:‘’,value:‘’},
      ];
    },
    //设定要访问的后端url
    apiServUrl() {
      let host = this.host;
      let debug = process.env.NODE_ENV === "development";
      let routeStr= "/emqx/httpapi";
      // console.log(process.env);
      // console.log(debug);
      debug?host.port = 20000:'';
      // console.log(host);
      return host.origin + routeStr;
      // return debug ? host.origin + "/emqx/httpapi" : "";
    }
  },
  methods: {
    setHttpReq() {
      let self = this;
      let api = self.selAPI;
      let emqxReqOpt = {
        route: api.route,
        method: api.method,
        data: {}
      };
      let opt = {
        method: "POST",
        body: JSON.stringify(emqxReqOpt)
      };

      if (!api) {
        return;
      }
      self.res = {};

      self.req = { url: self.apiServUrl, option: opt };
      return;
    },
    getApiResult: async function() {
      let self = this;
      let url = self.req.url;
      let opt = self.req.option;
      // let res=self.res={}
      //let res={}

      if (url) {
        self.res = await asyFetch(url, opt);
        // console.log('getApiResult(): ');
        // console.log(url);
        // console.log(opt);
      }

      return;
    }
  },
  components: {
    BContainer,
    BRow,
    BCol,
    // BFormSelect,
    BButton,
    BFormSelect,
    BBadge,
    TheArrayList: () => import("./TheArrayList.vue")
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name-align {
  text-align: right !important;
}

@media (max-width: 575.98px) {
  .name-align {
    text-align: left !important;
  }
}
</style>
