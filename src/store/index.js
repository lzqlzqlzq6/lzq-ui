import Vue from "vue";
import Vuex from "vuex";
import user from './modules/user';
import getters from './getters';
import permission from './modules/permission';
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex);


const store = new Vuex.Store({
  modules: {
    user,
    permission
  },
  
  getters,
  plugins: [persistedState({
    storage: window.sessionStorage,
    reducer(val) {
      return {
      user : val.user,
    }
 }

  })]
})

export default store
