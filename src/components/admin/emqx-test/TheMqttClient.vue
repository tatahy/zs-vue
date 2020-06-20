<template>
  <div>
    <h3 class="text-center" v-bind:class="`text-${themeCls}`">Using Mqtt.js (MQTT Client)</h3>

    <h4 class="text-center">EmqX-Broker</h4>

    <b-card
      v-if="!isConnected"
      header-tag="h4"
      header-text-variant="white"
      class="m-2"
      v-bind:header="connOpt.auth?`WebSocket Options (Security)`:`WebSocket Options`"
      v-bind:border-variant="themeCls"
      v-bind:header-bg-variant="themeCls"
    >
      <b-form v-on:submit="mqttConnect" v-on:reset="connOptRest">
        <b-row v-if="!isConnected">
          <b-col sm="6">
            <b-form-group label-cols-sm="3" label="Host:" label-align-sm="right" label-for="host">
              <b-form-input id="host" v-model="mqttUrl.hostname"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Port:" label-align-sm="right" label-for="port">
              <b-form-input id="port" v-model="mqttUrl.port"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Path:" label-align-sm="right" label-for="path">
              <b-form-input id="path" v-model="mqttUrl.pathname"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Protocol:" label-align-sm="right" class="mb-0">
              <b-form-radio-group class="pt-2" v-model="mqttUrl.protocol" :options="['ws:','wss:']"></b-form-radio-group>
            </b-form-group>
          </b-col>

          <b-col sm="6">
            <b-form-group
              label-cols-sm="3"
              label="Client Id:"
              label-align-sm="right"
              label-for="clientId"
            >
              <b-form-input id="clientId" v-model="connOpt.clientId"></b-form-input>
            </b-form-group>

            <template v-if="connOpt.auth">
              <b-form-group
                label-cols-sm="3"
                label="Username:"
                label-align-sm="right"
                label-for="username"
              >
                <b-form-input id="username" v-model="connOpt.username"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="Password:"
                label-align-sm="right"
                label-for="password"
              >
                <b-form-input id="password" v-model="connOpt.password" type="password"></b-form-input>
              </b-form-group>
            </template>

            <b-form-group
              label-cols-sm="3"
              label="Keep Alive(sec):"
              label-align-sm="right"
              label-for="keepAlive"
            >
              <b-form-input id="keepAlive" v-model="connOpt.keepalive"></b-form-input>
            </b-form-group>

            <b-form-group label-cols-sm="3" label="Auth:" label-align-sm="right" class="mb-0">
              <b-form-radio-group class="pt-2" v-model="connOpt.auth" :options="[0, 1]"></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col sm="6">
            <h5 class="text-right">
              <span
                class="badge badge-pill"
                v-bind:class="isConnected?`badge-success`:`badge-danger`"
              >{{isConnected?`Connected`:`Disconnected`}}</span>
              {{mqttUrl.href}}
            </h5>
          </b-col>
          <b-col class="text-right">
            <b-button class="m-1" :variant="themeCls" type="submit">Connect</b-button>
            <b-button class="m-1" type="reset">Reset</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>

    <template v-else>
      <h5 class="text-center">
        <span class="badge badge-pill badge-success">Connected</span>
        {{mqttUrl.href}}
        <b-button class="m-1" variant="danger" v-on:click="mqttDisconnect()">Disconnet</b-button>
      </h5>

      <b-card
        header-tag="h4"
        header-bg-variant="info"
        header-text-variant="white"
        border-variant="info"
        header="Publish"
        class="m-2"
      >
        <b-form v-on:submit="mqttPublish" v-on:reset="pubReset">
          <b-row>
            <b-col sm="6">
              <b-form-group
                label-cols-sm="3"
                label="Client Id:"
                label-align-sm="right"
                label-for="clientedId"
              >
                <b-form-input id="clientedId" v-model="pub.clientId" disabled></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Time:" label-align-sm="right" label-for="time">
                <b-form-input id="time" v-bind:value="pub.date" disabled></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label-cols-sm="3"
                label="Topic:"
                label-align-sm="right"
                label-for="topic"
              >
                <b-form-input id="topic" v-model="pub.topic"></b-form-input>
              </b-form-group>

              <b-form-group
                label-cols-sm="3"
                label="ClientId:"
                label-align-sm="right"
                label-for="pubClientId"
                class="sr-only"
              >
                <b-form-input id="pubClientId" v-model="pub.clientId" disabled></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Data:" label-align-sm="right" label-for="data">
                <b-form-input id="data" v-model="pub.data"></b-form-input>
              </b-form-group>

              <b-form-group label-cols-sm="3" label="Qos:" label-align-sm="right" class="mb-0">
                <b-form-radio-group class="pt-2" v-model="pub.qos" :options="[0, 1, 2]"></b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row class="text-right">
            <b-col>
              <b-button class="m-1" variant="info" type="submit">Publish</b-button>
              <b-button class="m-1" type="reset">Reset</b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card>

      <b-card header-tag="h4" header="Subscribe" class="m-2">
        <b-row>
          <b-col sm="6">
            <b-form-group
              label-cols-sm="3"
              label="Sub Topic:"
              label-align-sm="right"
              label-for="subTopic"
            >
              <b-form-input id="subTopic" v-model="sub.topic"></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label-cols-sm="3"
              label="Sub Qos:"
              label-align-sm="right"
              label-for="subQos"
            >
              <b-form-radio-group class="pt-2" v-model="sub.qos" :options="[0, 1, 2]"></b-form-radio-group>
            </b-form-group>
          </b-col>
        </b-row>

        <b-row>
          <b-col class="text-right">
            <b-button
              class="m-1"
              variant="outline-dark"
              v-on:click="mqttSubscribe()"
            >{{'Subscribe'}}</b-button>
            <b-button class="m-1" v-on:click="mqttUnsubscribe()">{{'Clear all'}}</b-button>
          </b-col>
        </b-row>

        <template v-if="topicArr.length">
          <h5>Subscribed Topic</h5>
          <TheArrayList
            list-val-name="topicArr"
            v-bind:list-val="topicArr"
            col-length="2"
            show-delete="true"
            v-on:list-delete-one="listDeleteOne"
          />
        </template>
      </b-card>

      <b-card v-if="msgArr.length" header-tag="h4" header="Recieved Msg" class="m-2">
        <div class="text-right">
          <b-button class="m-1" v-on:click="recievedMsgClear()">{{'Clear all'}}</b-button>
        </div>
        <TheArrayList
          list-val-name="msgArr"
          v-bind:list-val="msgArr"
          v-bind:sn-class="`badge badge-${themeCls}`"
          col-length="2"
          show-delete="true"
          v-on:list-delete-one="listDeleteOne"
        />
      </b-card>
    </template>
  </div>
</template>

<script>
import mqtt from "mqtt";

//引入BsV的component
import {
  BRow,
  BCol,
  // BFormSelect,
  BButton,
  BCard,
  BForm,
  // BCardGroup,
  // BCardFooter,
  BFormGroup,
  BFormInput,
  BFormRadioGroup
} from "bootstrap-vue";

const connOptDefault = {
  connectTimeout: 4000,
  // Authentication
  clientId: null,
  username: null,
  password: null,
  keepalive: 60,
  auth: 0
};
const pubDefault = {
  topic: "hello",
  date: null,
  clientId: null,
  qos: 0,
  data:null
};

const mqttUrlDefault = {
  hostname: null,
  port: 8083,
  pathname: null,
  protocol: "ws:",
  href: null
};

const debug=process.env==='development';

export default {
  name: "TheMqttClient",
  // props: {
  //   msg: String
  // },
  data: function() {
    return {
      themeCls: "primary",
      client: null,
      isConnected: false,
      connOpt: connOptDefault,
      pub: pubDefault,
      sub:{
        topic:'hello',
        qos: 0
      },
      mqttUrl: mqttUrlDefault,
      msgArr: [],
      topicArr: []
    };
  },
  computed: {
  
  },
  watch: {
    mqttUrl: {
      handler: function() {
        return this.mqttUrlSet();
      },
      deep: true
      // immediate:true
    },
    msgArr: function() {
      // console.log(this.msgArr.length);
      return this.msgArr;
    },
    topicArr: function() {
      // console.log(this.msgArr.length);
      return this.topicArr;
    }
  },
  methods: {
    mqttUrlSet() {
      let getPureUrl=()=>{
        let str=window.location.href;
        return str.indexOf('#')?str.slice(0,str.indexOf('#')):str;
      };
      const obj = new URL(getPureUrl());
      let url = this.mqttUrl;

      for (const name in url) {
        if (name in obj && name !== "href") {
          obj[name] = url[name];
        }
      }
      // if(url.protocol==="ws:"){
      //   url.port=8083
      // }

      // if(url.protocol==="wss:"){
      //   url.port=8084
      // }
      url.href = obj.href;
      return;
    },
    mqttUrlInit() {
      const obj = new URL(window.location.href);
      // const obj = new URL(window.location.href);
      let url = this.mqttUrl;
      // WebSocket connect url
      
      obj.hostname=debug?'localhost':'120.79.25.121';
      obj.protocol = "ws:";
      obj.pathname = "/mqtt";
      obj.port = 8083;

      for (const name in url) {
        if (name in obj) {
          url[name] = obj[name];
        }
      }

      return;
    },
    connOptInit() {
      const opt = Object.assign({}, connOptDefault);
      opt.clientId =
        "mqttjs-brower_" +
        Math.random()
          .toString(16)
          .substr(2, 8);
      this.connOpt = Object.assign({}, this.connOpt, opt);
      return;
    },
    connOptRest(evt) {
      evt.preventDefault();
      this.connOptInit();
      this.pubInit();
      this.mqttUrlInit();
      return;
    },
    pubInit() {
      const pub = Object.assign({}, pubDefault);

      pub.clientId = this.connOpt.clientId;
      this.pub = Object.assign({}, this.pub, pub);
      //设置this.pub.date的值每1秒变一次
      setInterval(() => {
        const dateNow = new Date();
        this.pub.date = dateNow.toTimeString();
        return;
      }, 1000);
      return;
    },
    pubReset(evt) {
      evt.preventDefault();
      this.pubInit();
    },
    mqttConnect(evt) {
      evt.preventDefault();
      let opt = this.connOpt;
      let client = (this.client = mqtt.connect(this.mqttUrl.href, opt));

      //回调函数用箭头函数才能调用/修改其他的函数、变量
      client.on("connect", () => {
        if (!client.connected) {
          // console.log("Client not connected");
          return;
        }
        this.isConnected = client.connected;
        this.pubInit();

        // console.log('connack: ',connack);

        // console.log(
        //   "connected, clientId: ",
        //   client.options.clientId,
        //   client.connected
        // );
      });

      // client.on("reconnect", error => {
      //   console.log("reconnecting:", error);
      // });

      // client.on("error", error => {
      //   console.log("Connect Error:", error);
      // });

      //处理订阅的信息 handle message event
      client.on("message", (topic, message) => {
        // console.log('Received from "', topic, '":', message);

      
        // console.log("packet: ", packet);
        // console.log("message: ", packet.payload);

        this.msgArr.push(JSON.parse(message.toString()));
        // console.log(this.msgArr.length);
      });

      client.on("end", () => {
        // console.log("Disconnected!", client.options.clientId);
        this.client = null;
        this.msgArr = [];
        this.topicArr = [];
        this.isConnected = false;
      });

      return;
    },
    mqttPublish(evt) {
      const client = this.client;
      let payload = Object.assign({}, this.pub, { date: Date.now() });

      evt.preventDefault();

      if(!payload.data){
        payload.data={};
      }

      // publich(topic, payload, options/callback)
      if (client.connected) {
        // client.publish(payload.topic, JSON.stringify(payload), error => {
        //   console.log(error || "Publish Success");
        // });

        client.publish(payload.topic, JSON.stringify(payload));
      }
      return;
    },
    mqttSubscribe() {
      let client = this.client;
      let sub = this.sub;
      let topic = sub.topic;

      //必须用箭头函数作为回调函数，才能在回调函数里正确引用this.topicArr
      client.subscribe(topic, (err, granted) => {
        let hasTopic = false;
        let obj = {};

        // console.log(topic, granted);

        if (err) {
          // console.log(err);
        }
        //收集订阅的topic，服务器无该topic，向服务器注册成功
        if (granted.length) {
          obj = granted[0];
        }

        //收集订阅的topic，已经向服务器注册过
        if (!granted.length) {
              for (var i = 0; i < this.topicArr.length; i++) {
            if (this.topicArr[i].topic == topic) {
              hasTopic = true;
              break;
            }
          }

          obj = sub;
        }

        if (!hasTopic) {
          this.topicArr.push(Object.assign({}, obj));
        }
        return;
      });

      return;
    },
    mqttUnsubscribe(index = null) {
      let client = this.client;
      // let sub = this.sub;
      let topicArr = this.topicArr;
      let removeTopic=topic=>{
        //向服务器解除注册的topic
        client.unsubscribe(topic, err => {
          if (err) {
            // console.log(err);
          }
        });
      };
      // console.log(topicArr,index);
      
      //删除所有已订阅的topic
      if(index==null && topicArr.length){
        topicArr.forEach(obj => {
         removeTopic(obj.topic);
        });
        this.topicArr=[];
      }

      //删除指定的订阅topic
      if(index!=null){
        removeTopic(topicArr[index].topic);
        this.topicArr.splice(index,1);
      }
      return;
    },
    mqttDisconnect() {
      let client = this.client;

      if (client != null) {
        client.end(true);
      }

      // this.client = null;

      // this.isConnected = false;
      return;
    },
    listDeleteOne(opt) {
      let name=opt.listValName;
      let idx=opt.index;
      // console.log(opt);
      if ( name in this) {
        name=='topicArr'?this.mqttUnsubscribe(idx):this[name].splice(idx, 1);
        // this.mqttUnsubscribe(opt);
      }
      return;
    },
    recievedMsgClear(){
      this.msgArr=[];
      return ;
    }
  },
  components: {
    BRow,
    BCol,
    BButton,
    BCard,
    BForm,
    // BCardGroup,
    // BCardFooter,
    BFormGroup,
    BFormInput,
    BFormRadioGroup,
    TheArrayList: () => import("@/components/admin/emqx-test/TheArrayList.vue")
  },
  created() {
    this.connOptInit();
    this.pubInit();
    this.mqttUrlInit();
    // setInterval(()=>{
    //     const dateNow = new Date();
    //     this.pub.date=dateNow.toTimeString();
    //     return;
    //   }, 1000);
  },
  destroyed() {
    this.mqttDisconnect();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
