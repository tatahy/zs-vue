<template>
  <div>
    <canvas v-bind:id="chartId" width="400" height="400" ref="canvas"></canvas>
  </div>
</template>

<script>
// import {// BTooltip,
// // VBTooltip
// }"bootstrap-vue";

import Chart from "chart.js";

export default {
  name: "TheChart",
  props: {
    chartId: {
      type: String,
      required: true,
      default: "chartId"
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
          "scatter"
        ];
        return nameArr.includes(val);
      }
    },
    plugins: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      _chart: null,
      _plugins: this.plugins
    };
  },
  computed: {},
  methods: {
    addPlugin(plugin) {
      this._plugins.push(plugin);
    },
    generateLegend() {
      if (this._chart) {
        return this._chart.generateLegend();
      }
    },
    renderChart(data, options) {
      const ctx = this.$ref.canvas.getContext("2d");
      if (this._chart) {
        this._chart.destroy();
      }
      this._chart = new Chart(ctx, {
        type: this.chartType,
        data: data,
        options: options,
        plugins: this._plugins
      });
    }
  },
  components: {},
  mounted(){
    // this.renderChart(data,options);
  },
  beforeDestroy() {
    if (this._chart) {
      this._chart.destroy();
    }
  }
};
</script>