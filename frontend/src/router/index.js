import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Kanban from '@/components/Kanban';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(Router);
Vue.use(Vuex);

var axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/'
});

Vue.use(VueAxios, axiosInstance);

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Kanban',
      component: Kanban
    }
  ]
});
