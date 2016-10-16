export default (router) => router.map({
  '/': {
    name: 'default',
    component: require('./views/index')
  },

  '/index': {
    name: 'index',
    component: require('./views/index')
  },

  '*': {
    name: '404',
    component: require('./views/404')
  }
});
