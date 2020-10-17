import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
axios.defaults.headers['Content-type'] = 'application/json';
import {ipcRenderer} from 'electron';

Vue.prototype.$ipcRenderer = ipcRenderer;
Vue.prototype.$axios = axios;


import Vicon from 'vue-icon'
Vue.use(Vicon, 'v-icon')
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
