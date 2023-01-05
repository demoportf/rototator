import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const options = {
    state: {
        connected: false,
        errors: [],
        localQthLocator: '',
        remoteQthLocator: '',
    },
    getters: {
    },
    mutations:  {
      addLocalQthLocator(state, loc){
        state.localQthLocator = loc;
      }
    },
    actions: {
    },
  };

export default new Vuex.Store(options);