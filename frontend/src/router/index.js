import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import Kanban from '@/components/Kanban';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'es6-promise/auto';


Vue.use(Router);
Vue.use(Vuex);

// var axiosInstance = axios.create({
//   baseURL: 'http://127.0.0.1:8000/'
// });

// Vue.use(VueAxios, axiosInstance);
Vue.use(VueAxios, axios);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Kanban',
      component: Kanban
    }
  ]
});
