import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import store from './store';
import List from './components/List';
import Article from './components/Article';

Vue.config.productionTip = false;
Vue.config.devtools      = true;

import App from './App.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode  : 'history',
  base  : __dirname,
  routes: [
    {
      path    : '/',
      redirect: '/list/' + store.state.activeTab
    }, {
      path     : '/list/:id',
      name     : 'Article List',
      component: List
    }, {
      path     : '/article/:id',
      name     : 'Article View',
      component: Article
    }, {
      path    : '*',
      redirect: '/list/' + store.state.activeTab
    }
  ]
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
