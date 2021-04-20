import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import VueTimeago from 'vue-timeago';

import config from './config';
import store from './store';
import List from './components/List';
import Article from './components/Article';
import Login from './components/Login';
import Auth from './components/Auth';

Vue.config.productionTip = false;
Vue.config.devtools      = true;

import App from './App.vue';
import './registerServiceWorker';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(VueTimeago, {
  name  : 'Timeago', // Component name, `Timeago` by default
  locale: 'en'
});

const router = new VueRouter({
  mode  : 'history',
  base  : __dirname,
  routes: [
    {
      path     : '/auth',
      name     : 'Auth',
      component: Auth
    }, {
      path     : '/login',
      name     : 'Login',
      component: Login
    }, {
      path     : '/list/:id',
      name     : 'Article List',
      component: List
    }, {
      path     : '/article/:id',
      name     : 'Article View',
      component: Article
    }, {
      path    : '/',
      redirect: '/list/' + store.state.activeTab
    }, {
      path    : '*',
      redirect: '/list/' + store.state.activeTab
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (!localStorage.jwt && to.name !== 'Login') {
    router.push('/login');
    next();
  }

  if (!sessionStorage.jwtValidated || Date.now() - sessionStorage.jwtValidated > 300000) {
    //5 mins
    const jwt = localStorage.jwt;
    axios.post(`${config.backendUrl}/auth/verify-token`, {jwt: jwt}).then(response => {
      if (response.status === 200) 
        sessionStorage.jwtValidated = Date.now();
      console.log('Token ok');
    }).catch(error => {
      console.error(error);
      next();
    });
  }
  next();
});
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
