<template>
  <div>
    <h4 class="text-center">写入“data_raw”数据表数据（http协议）</h4>
    <!-- <b-form> -->
    <b-form v-on:submit="postData" v-on:reset="resetData" class="pt-2">
      <b-row>
        <b-col sm="6">
          <b-form-group label-cols-sm="3" label="rh(%):" label-align-sm="right" label-for="host">
            <b-form-input id="rh" v-model="param.rh"></b-form-input>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="amp(A):" label-align-sm="right" label-for="port">
            <b-form-input id="amp" v-model="param.amp"></b-form-input>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="vol(V):" label-align-sm="right" label-for="path">
            <b-form-input id="vol" v-model="param.vol"></b-form-input>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="temp(C):" label-align-sm="right" label-for="path">
            <b-form-input id="temp" v-model="param.temp"></b-form-input>
          </b-form-group>
          <!-- <b-form-group label-cols-sm="3" label=":" label-align-sm="right" class="mb-0">
            <b-form-radio-group class="pt-2" v-model="req.data.protocol" :options="['ws:','wss:']"></b-form-radio-group>
          </b-form-group>-->
        </b-col>
        <b-col sm="6">
          <b-form-group label-cols-sm="3" label="设备Id:" label-align-sm="right" label-for="equipmentId">
            <b-form-input id="equipmentId" v-model="equipmentId"></b-form-input>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="SN:" label-align-sm="right" label-for="sn">
            <b-form-input id="sn" v-model="module.sn"></b-form-input>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="type:" label-align-sm="right" label-for="type">
            <b-form-input id="type" v-model="module.type"></b-form-input>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="time:" label-align-sm="right" label-for="time">
            <b-form-input id="time" v-model="timestr" disabled></b-form-input>
            <!-- <b-form-input id="timestamp" v-bind:value="req.data.timestamp" disabled></b-form-input> -->
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <p>向服务器post结果:</p>
        <p>{{res}}</p>
      </b-row>

      <b-row>
        <!-- <b-col sm="6">
            <h5 class="text-right">
              <span
                class="badge badge-pill"
                v-bind:class="isConnected?`badge-success`:`badge-danger`"
              >{{isConnected?`Connected`:`Disconnected`}}</span>
              {{mqttUrl.href}}
            </h5>
        </b-col>-->
        <b-col sm="6" class="text-right">
          <b-button class="m-1" variant="primary" type="submit">Post</b-button>
          <b-button class="m-1" type="reset">Reset</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
//引入BsV的component
import {
  BRow,
  BCol,
  // BFormSelect,
  BButton,
  // BCard,
  BForm,
  // BCardGroup,
  // BCardFooter,
  BFormGroup,
  BFormInput
  // BFormRadioGroup
} from "bootstrap-vue";

import { asyFetch, getServUrl } from "@/utility/util";

export default {
  name: "HandleData",
  data() {
    return {
      equipmentId:1,
      timer: null, //定义计时器名称
      timestr: '',
      param: {
        rh: 92.0,
        amp: 1000.1,
        vol: 5,
        temp: 26.9
      },
      module: {
        sn: "m001",
        type: "控制/采集模块"
      },
      res: null
    };
  },
  computed: {
    req() {
      const load = {
        info_id: this.equipmentId,
        data: {
          param: this.param,
          module: this.module,
          timestamp: null
        },
        customer_id: 0
      };
      return Object.assign({}, load, { tblName: "data_raw" });
    }
  },
  watch: {
    // req: {
    //   handler: "getNow",
    //   deep: true,
    //   immediate: true
    // }
  },
  methods: {
    setTimer: function() {
      if (this.timer == null) {
        this.timer = setInterval(() => {
          const dateNow = new Date();
          this.timestr = dateNow.toLocaleString();
          this.req.data.timestamp = dateNow.getTime();
          // console.log(this.req.data.timestamp);
        }, 1000);
      }
    },
    postData: async function(evt) {
      evt.preventDefault();
      const opt = { method: "POST", body: JSON.stringify(this.req) };
      const url = getServUrl() + "equipment/data";
      this.res = null;
      this.res = await asyFetch(url, opt);
    },
    resetData: function() {
      console.log("resetData");
    },
    //清除定时器
    clearTimer() {
      //清除定时器
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  components: {
    BRow,
    BCol,
    BButton,
    // BCard,
    BForm,
    // BCardGroup,
    // BCardFooter,
    BFormGroup,
    BFormInput
    // BFormRadioGroup
  },
  created() {
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
    this.clearTimer();
    this.timer = null;
    this.setTimer();
  },
  // 最后在beforeDestroy()生命周期内清除定时器：
  beforeDestroy() {
    this.clearTimer();
  }
};
</script>

<style scoped>
</style>
