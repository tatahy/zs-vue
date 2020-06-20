<template>
  <div class="pb-2">
    <div class="text-center">
        <!-- <img v-show="!componentName" alt="Vue logo" src="@/assets/logo.png"> -->
        <br>
        <h1 class="txtCenter">"EmqX Test Page"</h1>
        <b-button  
          class="m-1"
          size="lg"
          v-for="(component,idx) in components" 
          v-bind:key="idx"
          v-bind:variant="component.themeCls"
          v-on:click="changeName(component.name)"
        >  {{'Show '+component.name}}</b-button>
    </div>
  
    <hr>

    <TheEmqxHttpApi v-show="'httpApi'===componentName"/>

    <TheMqttClient v-show="'mqttClient'===componentName"/>
 
  </div>
</template>

<script>
//引入BsV的component
import { 
  
  // BFormSelect,
  BButton,	
} from 'bootstrap-vue'

import TheEmqxHttpApi from '@/components/admin/emqx-test/TheEmqxHttpApi.vue'

export default {
  name: 'TheLayer',
  // props: {
  //   msg: String
  // },
  data:function(){
    return {
      componentName:'',
      components:[
        {name:'httpApi',themeCls:'success'},
        {name:'mqttClient',themeCls:'primary'},
      ]
    }

  },
  computed:{
      
  },
  methods:{
    changeName(name){
      return this.componentName=name
    },
  },
  components: {
    TheEmqxHttpApi,
    TheMqttClient:()=>import ('@/components/admin/emqx-test/TheMqttClient.vue'),
    BButton,
    
  }
  
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
