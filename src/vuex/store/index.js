import Vue from 'vue'
import Vuex from 'vuex'
import {state, actions, getters, mutations, modules} from './options'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules
})

// hot reload
if (module.hot) {
  module.hot.accept([
    './options'
  ], () => {
    let options = require('./options')
    store.hotUpdate({
      getters: options.getters,
      actions: options.actions,
      mutations: options.mutations,
      modules: options.modules,
    })
  })
}

export default store
