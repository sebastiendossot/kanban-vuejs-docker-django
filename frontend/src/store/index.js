import Vue from 'vue';
import Vuex from 'vuex';
import kanban from './modules/kanban';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    kanban
  }
});

export default store;
