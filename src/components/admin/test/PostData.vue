<template>
  <div>
    <h4 class="text-center">写入“data_raw”数据表数据（http协议）</h4>
    <!-- <b-form> -->
    <b-form v-on:submit="postData" v-on:reset="resetData" class="pt-2">
      <b-row>
        <b-col sm="6">
          <b-form-group label-cols-sm="3" label="相对湿度(%):" label-align-sm="right" label-for="host">
            <b-form-input id="rh" v-model="form.data.param.rh"></b-form-input>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="电流(A):" label-align-sm="right" label-for="port">
            <b-form-input id="amp" v-model="form.data.param.amp"></b-form-input>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="电压(V):" label-align-sm="right" label-for="path">
            <b-form-input id="vol" v-model="form.data.param.vol"></b-form-input>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="温度(C):" label-align-sm="right" label-for="path">
            <b-form-input id="temp" v-model="form.data.param.temp"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label-cols-sm="3"
            label="设备Id:"
            label-align-sm="right"
            label-for="equipmentId"
          >
            <b-form-input id="equipmentId" v-model="form.info_id"></b-form-input>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="SN:" label-align-sm="right" label-for="sn">
            <b-form-input id="sn" v-model="form.data.module.sn"></b-form-input>
          </b-form-group>

          <b-form-group label-cols-sm="3" label="模块类型:" label-align-sm="right" label-for="type">
            <b-form-input id="type" v-model="form.data.module.type"></b-form-input>
          </b-form-group>
          <b-form-group label-cols-sm="3" label="时间:" label-align-sm="right" label-for="time">
            <b-form-input id="time" v-model="timestr" disabled></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row v-if="res" class="m-3">
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
        <b-col class="text-right">
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
  name: "PostData",
  data() {
    return {
      //与数据表中的字段对应
      form: {
        info_id: "null",
        data: {
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
          timestamp: null
        }
      },
      plus: {
        tblName: "data_raw",
        customer_id: 0
      },
      timer: null, //定义计时器名称
      timestr: "",
      res: null
    };
  },
  computed: {
    req() {
      return Object.assign({}, this.form, this.plus);
    }
  },
  watch: {
    // req: {
    //   handler: "resetData",
    //   deep: true,
    //   immediate: true
    // }
  },
  // TODO: post前的数据校验
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
      const url = getServUrl() + "equipment/create";
      this.res = null;
      this.res = await asyFetch(url, opt);
    },
    resetData: function(evt) {
      evt.preventDefault();
      const formDefault = {
        info_id: "null",
        data: {
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
          timestamp: null
        }
      };
      this.form = Object.assign({}, this.form, formDefault);
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
