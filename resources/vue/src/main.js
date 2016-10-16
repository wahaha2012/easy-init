import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routerConfig from './routers'
import store from './vuex/store';

Vue.use(VueRouter);

const router = new VueRouter();
routerConfig(router);

// router.beforeEach((transition) => {
//   // document.body.scrollTop = 0;
//   // const token = getToken(store.state);
//   // if (token) {
//   //   fetchMsgCount(store, token)
//   //     .catch((e) => console.log(e));
//   // }
//   // if (transition.to.auth) {
//   //   if (token) {
//   //     transition.next();
//   //   } else {
//   //     const redirect = encodeURIComponent(transition.to.path);
//   //     transition.redirect({ name: 'login', query: { redirect } });
//   //   }
//   // } else {
//   // }
//   // transition.next();
// });

router.start(Vue.extend(App), '#app')


