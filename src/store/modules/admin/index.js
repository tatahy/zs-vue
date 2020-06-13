// assemble modules and export the store

import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'


export default {
  namespaced:true,
  state,
  getters,
  actions,
  mutations

};