<template>
  <div class="card">
    <h5
      class="m-0 text-center py-2 rounded-top"
      v-bind:class="titleCls"
      v-bind:style="{cursor: 'pointer'}"
      v-bind:id="param.name"
      v-on:mouseover="isHover=true"
      v-on:mouseout="isHover=false"
      v-on:click="visible=!visible"
    >{{param.txt}}</h5>
    <b-tooltip v-bind:target="param.name" placement="bottom">{{visible?'隐藏':'显示详情'}}</b-tooltip>
    <!-- 
    <b-collapse v-model="visible">
      <div class="mr-2">
    <canvas v-bind:id="chartId" ref="canvas"></canvas>-->
    <!-- <canvas v-bind:id="chartId" width="400" height="400" ref="canvas"></canvas> -->
    <!-- </div>
    </b-collapse>-->
    <div v-show="visible" class="mr-2">
      <canvas v-bind:id="chartId" ref="canvas"></canvas>
      <!-- <canvas v-bind:id="chartId" width="400" height="400" ref="canvas"></canvas> -->
    </div>
  </div>
</template>

<script>
import {
  BTooltip,
  // BCollapse
} from "bootstrap-vue";

import Chart from "chart.js";

export default {
  name: "TheChart",

  props: {
    param: {
      type: Object,
      default: function () {
        return {
          name: "",
          txt: "",
          timestamp: [],
          value: [],
        };
      },
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    chartId: {
      type: String,
      required: true,
      default: "chartId",
    },
    chartType: {
      type: String,
      required: true,
      default: "bar",
      validator(val) {
        const nameArr = [
          "line",
          "bar",
          "horizontalBar",
          "doughnut",
          "pie",
          "polarArea",
          "radar",
          "bubble",
          "scatter",
        ];
        return nameArr.includes(val);
      },
    },
    plugins: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      chartObj: null,
      chartData: null,
      priPlugins: this.plugins,
      visible: this.isShow,
      isHover: false,
    };
  },
  computed: {
    titleCls: function () {
      let res = this.isHover || this.visible;
      return res ? "text-light bg-secondary" : "bg-light";
    },

    chartOptions: function () {
      const options = {};

      return options;
    },
  },
  watch: {
    // chartData:'renderChart'
    // chartData: {
    //   // handler(newVal) {
    //   //   console.log(newVal);
    //   //   return this.renderChart();
    //   // },
    //   handler() {
    //     return this.renderChart();
    //   },
    //   immediate: true,
    //   // deep: true,
    // },
  },
  methods: {
    addPlugin(plugin) {
      this.priPlugins.push(plugin);
    },
    setChartData: function () {
      const data = {
        labels: this.param.timestamp.map((el) => {
          //isoStr='2020-08-10T16:14:48.060Z'
          const isoStr = new Date(el).toISOString();
          return isoStr.substring(0, isoStr.length - 5).replace("T", " ");
        }),
        datasets: [
          {
            // label: "# of Votes",
            data: this.param.value,
            borderColor: ["rgba(54, 162, 235, 1)"],
            backgroundColor: ["rgba(255, 255, 255,0)"],
            // backgroundColor: [
            //     'rgba(255, 99, 132, 0.2)',
            //     'rgba(54, 162, 235, 0.2)',
            //     'rgba(255, 206, 86, 0.2)',
            //     'rgba(75, 192, 192, 0.2)',
            //     'rgba(153, 102, 255, 0.2)',
            //     'rgba(255, 159, 64, 0.2)'
            // ],
            // borderColor: [
            //     'rgba(255, 99, 132, 1)',
            //     'rgba(54, 162, 235, 1)',
            //     'rgba(255, 206, 86, 1)',
            //     'rgba(75, 192, 192, 1)',
            //     'rgba(153, 102, 255, 1)',
            //     'rgba(255, 159, 64, 1)'
            // ],
            // borderWidth: 1
          },
        ],
      };
      this.chartData = data;
      return data;
    },
    // generateLegend() {
    //   if (this.chartObj) {
    //     return this.chartObj.generateLegend();
    //   }
    // },
    renderChart() {
      const ctx = document.getElementById(this.chartId);
      // const ctx = this.$refs.canvas;
      // const ctx = this.$refs.canvas.getContext("2d");
      if (this.chartObj) {
        this.chartObj.destroy();
      }
      this.setChartData();
      this.chartObj = new Chart(ctx, {
        type: this.chartType,
        data: this.chartData,
        options: this.chartOptions,
        plugins: this.priPlugins,
      });
    },
  },
  components: {
    BTooltip,
    // BCollapse,
  },
  mounted() {
    this.renderChart();
  },
  beforeDestroy() {
    if (this.chartObj) {
      this.chartObj.destroy();
    }
  },
};
</script>