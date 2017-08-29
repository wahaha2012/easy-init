import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/views/Hello';
import NotFound from '@/views/404';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello,
    },
    {
      path: '*',
      name: '404',
      component: NotFound,
    },
  ],
});
