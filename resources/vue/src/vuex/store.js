import Vuex from 'vuex';
import Vue from 'vue';
// import middlewares from './middlewares';
import localCache from './localCache';

Vue.use(Vuex);

const state = {
  title: '',
};

const mutations = {
  UPDATE_TITLE(state, title){
    state.title = title;
  },
};

export default new Vuex.Store({
  state,
  mutations,
  strict: process.env.NODE_ENV !== 'production',
  // middlewares,
});
