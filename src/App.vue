<template>
  <div id="app" class="w-screen h-screen">
    <div class="home w-full h-full grid grid-cols-1" style="grid-template-rows: 32px 30px auto 32px">
      <div class="bg-blue-600 flex items-center justify-between" style="-webkit-app-region: drag">
        <div class="text-lg font-semibold text-white p-2 select-none">Digital Azul</div>
        <div class="flex items-center justify-center text-white" style="-webkit-app-region: no-drag">
          <div class="p-2 hover:bg-blue-500 cursor-pointer" @click="minimize">
            <v-icon name="minus" class="h-8 p-2"></v-icon>
          </div>
          <div class="p-2 hover:bg-blue-500 cursor-pointer" @click="close">
            <v-icon name="x" class="h-8 p-2"></v-icon>
          </div>
        </div>
      </div>
      <div class="bg-blue-500 flex">
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer flex items-center space-x-1 CPU" @click="$router.push('/')">
          <div><cpu class="h-4 w-4" fill="#FFFF"/></div>
          <div class="select-none">CPU</div>
        </div>
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer flex items-center space-x-1 Memory" @click="$router.push('/Mem')">
          <div><ram class="h-4 w-4" fill="#FFFF"/></div>
          <div class="select-none">MEM</div>
        </div>
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer flex items-center space-x-1 Graphics" @click="$router.push('/graphics')">
          <div><video-card class="h-4 w-4" fill="#FFFF"/></div>
          <div class="select-none">GRAPHICS</div>
        </div>
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer flex items-center space-x-1 Disk" @click="$router.push('/disk')">
          <div><hard-disk class="h-4 w-4" fill="#FFFF"/></div>
          <div class="select-none">DISK</div>
        </div>
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer flex items-center space-x-1 Settings" @click="$router.push('/settings')">
          <div><settings class="h-4 w-4" fill="#FFFF"/></div>
          <div class="select-none">SETTINGS</div>
        </div>
      </div>
      <div class="bg-white p-2">
        <loader v-if="loader === true"/>
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
      <div class="bg-blue-600 flex items-center justify-between text-white p-4">
        <div class="text-md select-none">&#169; Todos os direitos reservados <span class="font-medium select-text">www.digitalazul.com.br</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import cpu from './assets/icons-menu/cpu.svg'
import ram from './assets/icons-menu/ram.svg'
import videoCard from './assets/icons-menu/video-card.svg'
import hardDisk from './assets/icons-menu/hard-disk.svg'
import settings from './assets/icons-menu/settings.svg'

export default {
  name: 'App',
  data: () => ({
    loader: true
  }),
  components: {
    cpu,
    ram,
    videoCard,
    hardDisk,
    settings
  },
  created() {
    this.$bus.$on('loader-hide', () => this.loader = false)
    this.$bus.$on('loader-show', () => this.loader = true)
  },
  mounted() {
    document.querySelector(`.${this.$route.name}`).classList.add('bg-blue-600');
  },
  methods: {
    close() {
      const { remote } = require('electron')
      remote.BrowserWindow.getFocusedWindow().close();
    },
    minimize() {
      const { remote } = require('electron')
      remote.BrowserWindow.getFocusedWindow().minimize();
    }
  },
  watch: {
    $route(to, from) {
      const {name} = from;
      const {name: toName} = to;
      document.querySelector(`.${name}`).classList.remove('bg-blue-600');
      document.querySelector(`.${toName}`).classList.add('bg-blue-600');
    }
  }
}
</script>

<style src="./styles/main.css"></style>
