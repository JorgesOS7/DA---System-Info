import Vue from 'vue'
import VueRouter from 'vue-router'
import CPU from '../views/CPU.vue'
import Memory from '../views/Memory.vue'
import Graphics from '../views/Graphics.vue'
import Disk from '../views/Disk.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'CPU',
    component: CPU
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
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
