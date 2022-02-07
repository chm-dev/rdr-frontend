import Vue from 'vue';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';
import VueTimeago from 'vue-timeago';

import config from './config';
const {backendUrl} = config;

import store from './store';
import List from './components/List';
import Article from './components/Article';
import Login from './components/Login';
import Auth from './components/Auth';
import Register from './components/Register';
import Add from './components/Add';

Vue.config.productionTip = false;
Vue.config.devtools      = true;

import App from './App.vue';
import wb from './registerServiceWorker';
import axios from 'axios';

Vue.prototype.$workbox = wb;

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
      path     : '/register',
      name     : 'Register',
      component: Register
    }, {
      path     : '/list/:id',
      name     : 'Article List',
      component: List
    }, {
      path     : '/article/:id',
      name     : 'Article View',
      component: Article
    }, {
      path     : '/add',
      name     : 'Add',
      component: Add
    }, {
      path    : '/',
      redirect: '/list/' + store.state.activeTab
    }, {
      path    : '*',
      redirect: '/list/' + store.state.activeTab
    }
  ]
});

//* Verify AUTH

router.beforeEach((to, from, next) => {
  //* Case - no token saved in ls
  if (!localStorage.jwt && to.name !== 'Login' && to.name !== 'Register') {
    router.push('/login');
    next();
    return;
  }

  //* Case - token was not validated in this session or was validated longer then 5 mins ago
  if (localStorage.jwt && (!sessionStorage.jwtValidated || Date.now() - sessionStorage.jwtValidated > 300000)) {
    //5 mins
    const jwt = localStorage.jwt;
    axios.post(`${backendUrl}/auth/verify-token`, {jwt: jwt}).then(response => {
      if (response && response.status === 200) {
        sessionStorage.jwtValidated = Date.now();
        if (!axios.defaults.headers.common['Authorization'] || !axios.defaults.headers.common['Authorization'].includes(jwt)) 
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
        
        console.log('Token ok');
      }
    }).catch(error => {
      console.error(Object.keys(error));

      if (localStorage.jwt) 
        delete localStorage.jwt;
      if (axios.defaults.headers.common['Authorization']) 
        delete axios.defaults.headers.common['Authorization'];
      }
    );
  }
  if (localStorage.jwt && (!axios.defaults.headers.common['Authorization'] || !axios.defaults.headers.common['Authorization'].includes(localStorage.jwt))) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.jwt;
  }
  next();
});

//* Get all unauthorised requests to backend which are unauthorised 4xx -> redirect to login
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // console.log(Object.keys(error));

  const {url} = error.response.config;
  const {status} = error.response;
  //  console.log(url,status);
  if (url.includes(backendUrl) && status == 403 && router.currentRoute.name !== 'Login' && router.currentRoute.name !== 'Register') {
    router.push({
      name  : 'Login',
      params: {
        errorMessage: 'Please login'
      }
    });

    return;
  }
  return Promise.reject(error);
});

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
