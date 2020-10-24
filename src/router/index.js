import Vue from 'vue'
import VueRouter from 'vue-router'
import CPU from '../views/CPU.vue'
import Memory from '../views/Memory.vue'
import Graphics from '../views/Graphics.vue'
import Disk from '../views/Disk.vue'
import Settings from '../views/Settings.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Setup',
    component: () => import('../views/Setup.vue'),
    beforeEnter(to,from,next) {
      let params;
      params = localStorage.getItem('Params');
      if(params !== null)
        next('/cpu');
      else
        next();
    }
  },
  {
    path: '/cpu',
    name: 'CPU',
    component: CPU,
   beforeEnter(to,from,next) {
      let params;
      params = localStorage.getItem('Params');
      if(params !== null)
        next();
      else
        next('/');
    }
  },
  {
    path: '/mem',
    name: 'Memory',
    component: Memory
  },
  {
    path: '/graphics',
    name: 'Graphics',
    component: Graphics
  },
  {
    path: '/disk',
    name: 'Disk',
    component: Disk
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
