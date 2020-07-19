<template>
  <div class="table-responsive">
    <table v-bind:class="`table table-hover ${tbClass}`">
      <thead v-bind:class="headBg">
        <!-- <thead class="thead-light"> -->
        <tr>
          <th
            v-for="(val,idx) in fields"
            v-bind:key="idx"
          >{{fieldsChn.hasOwnProperty(val)?fieldsChn[val]:val}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(itm,m) in items" v-bind:key="m">
          <td v-for="(val,n) in fields" v-bind:key="n">
            {{itm[val]}}
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
      type: String,
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
    fieldsChn: {
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
  computed: {
    
  },
  methods: {}
};
</script>