import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {ipcRenderer} from 'electron';

import Vicon from 'vue-icon';
Vue.use(Vicon, 'v-icon');

Vue.prototype.$bus = new Vue();
Vue.prototype.$appInfo = {
  author: 'Digital Azul',
  email: 'suporte@digitalazul.com.br',
  version: require('../package.json').version,
  nameApp: 'DA - System Info',
  homepage: 'www.digitalazul.com'
}
Vue.component('loader', () => import('./components/Loader.vue'));
Vue.prototype.$ipcRenderer = ipcRenderer;


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
