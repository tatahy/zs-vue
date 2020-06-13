// assemble modules and export the store


import Vue from 'vue'
import Vuex from 'vuex'

//root state
import state from './state.js'
// //root getters
// import getters from './getters.js'
//root mutations
import mutations from './mutations.js'
// //root actions
// import actions from './actions.js'

//modules
import index from './modules/index'
import admin from './modules/admin'

Vue.use(Vuex);

//只能通过commit mutations中的函数才能修改state中的数据
const store = new Vuex.Store({
  modules: {
    index,
    admin
  },
  strict: process.env.NODE_ENV !== 'production',
  //plugins: debug ? [createLogger()] : []
  state,
  // getters,
   mutations
  // actions
});

export default store;