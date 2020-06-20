<template>
  <div v-if="valArr.length">
    <div class="pl-2" v-for="(obj,idx) in valArr" v-bind:key="idx">
      <b-row v-if="valArr.length>1">
        <b-col>
          <h5>
            <b-badge v-bind:variant="snClass">{{idx+1}}</b-badge>
          </h5>
        </b-col>
        <b-col>
          <b-button
            v-show="showDelete"
            variant="link"
            v-on:click="valArrDelete"
            v-bind:value="idx"
          >X</b-button>
        </b-col>
      </b-row>

      <b-row
        v-bind:align-v="`${alignVertical}`"
        v-for="([name,value],m) in Object.entries(obj)"
        v-bind:key="m"
      >
        <b-col v-bind:sm="`${colLength}`" class="name-align">
          <span v-bind:class="`${nameStyle}`">{{upperCase?name.toUpperCase()+':':name+':'}}</span>
        </b-col>
        <b-col class="text-left">
          
            <TheArrayList 
              v-if="typeof value =='object'"
              list-val-name="value" 
              col-length="2" 
              v-bind:list-val="value" 
              name-style="text-monospace" 
            />

          <template v-else>{{value}}</template>
          
          <!-- <template v-if="Array.isArray(value)">
            <div v-for="(v,l) in value" v-bind:key="l">{{v}}</div>
          </template>

          <template v-else>{{value}}</template> -->
        </b-col>
      </b-row>
    </div>
  </div>
</template>


<script>
//引入BsV的component
import { BRow, BCol, BButton,BBadge } from "bootstrap-vue";

export default {
  name: "TheArrayList",
  props: {
    snClass: {
      type: String,
      default: "info"
    },
    nameStyle:{
      type: String,
      default: "font-weight-bold",
      validator: function(value) {
        //BootStrap4.0中对应的字体
        return ["text-monospace","font-italic","font-weight-bold"].indexOf(value) !== -1;
      }
    },
    upperCase: {
      type: Boolean,
      default: false
    },
    colLength: {
      type: String,
      default: "6"
    },
    showDelete: {
      type: [Boolean, String],
      default: false,
      validator: function(value) {
        // The value must match one of these strings
        // console.log(value)
        return [true, false, "true", "false"].indexOf(value) !== -1;
      }
    },
    alignVertical: {
      type: String,
      default: "start",
      validator: function(value) {
        // The value must match one of these strings
        // console.log(value)
        return ["start", "center", "end"].indexOf(value) !== -1;
      }
    },
    listVal: {
      type: [Object, Array],
      required: true,
      default: function() {
        return [];
      }
    },
    listValName: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      valArr: []
    };
  },
  computed: {
    // valArr: {
    //   get: function() {
    //     const val = this.listVal;
    //     let arr = [];
    //     if (typeof val == "object" && !Array.isArray(val)) {
    //       // val={a:1,b:2,c:3}
    //       arr.push(val); // arr=[{a:1,b:2,c:3}]
    //     }
    //     if (Array.isArray(val) && val.length) {
    //       // val=[{a:1,b:2,c:3},{aa:11,bb:22,cc:33}]
    //       arr = val;
    //       // arr=[{a:1,b:2,c:3},{aa:11,bb:22,cc:33}]
    //     }
    //     return arr;
    //   },
    //   set:function(value){
    //     console.log(value);
    //     return;
    //   }
    // }
  },
  watch: {
    listVal: function() {
      return this.valArrSet();
    }
  },
  methods: {
    valArrSet() {
      const val = this.listVal;
      let arr = [];

      if (typeof val == "object" && !Array.isArray(val)) {
        // val={a:1,b:2,c:3}
        // if(Object.entries(val).length){
        //   arr.push(val); // arr=[{a:1,b:2,c:3}]
        // }
        // //val={}
        // else{
        //   arr.push([]);
        // }
        arr.push(val);
      }

      if (Array.isArray(val) && val.length) {
        // val=[{a:1,b:2,c:3},{aa:11,bb:22,cc:33}]
        arr = val;
        // arr=[{a:1,b:2,c:3},{aa:11,bb:22,cc:33}]
      }
      this.valArr = arr;
      return;
    },
    valArrDelete(evt) {
      let idx = evt.target.value;
      //删除数组中下标为idx的数组元素
      // this.valArr.splice(idx,1);
      //产生事件'list-delete-one'，向父组件传送新数组
      this.$emit("list-delete-one", {
        id: this.id,
        index: idx,
        listValName: this.listValName
      });
      return;
    }
  },
  components: {
    BRow,
    BCol,
    BButton,
    BBadge
  },
  // mounted(){
  created() {
    this.valArrSet();
  }
};
</script>

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
