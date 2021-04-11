import Vue from 'vue'
import Vuex from 'vuex'
import AdminStore from './Admin/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Admin:AdminStore,
  }
})
