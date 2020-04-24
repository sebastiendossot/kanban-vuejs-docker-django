import Vue from 'vue';
import Router from 'vue-router';
import Kanban from '@/components/Kanban';
import axios from 'axios';
import VueAxios from 'vue-axios';

import 'es6-promise/auto';

Vue.use(Router);

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
