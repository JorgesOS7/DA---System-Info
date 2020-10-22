<template>
  <div id="app" class="w-screen h-screen">
    <div class="home w-full h-full grid grid-cols-1" style="grid-template-rows: 32px 30px auto 32px">
      <div class="bg-blue-600 flex items-center justify-between" style="-webkit-app-region: drag">
        <div class="text-lg font-semibold text-white p-2">Digital Azul</div>
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
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer CPU" @click="$router.push('/')">
          CPU
        </div>
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer Memory" @click="$router.push('/Mem')">
          MEM
        </div>
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer Graphics" @click="$router.push('/graphics')">GRAPHICS</div>
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer Disk" @click="$router.push('/disk')">DISK</div>
        <div class="text-white px-2 hover:bg-blue-600 cursor-pointer flex items-center space-x-1">
          <div>
            <settings class="h-4" fill="#FFFF"/>
          </div>
          <div>SETTINGS</div>
        </div>
      </div>
      <div class="bg-white p-2">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
      <div class="bg-blue-600 flex items-center justify-between text-white p-4">
        <div class="text-md">&#169; Todos os direitos reservados <span class="font-medium">www.digitalazul.com.br</span></div>
        <div class="text-sm font-semibold">suporte@digitalazul.com.br</div>
      </div>
    </div>
  </div>
</template>

<script>
import settings from './assets/icons-menu/settings.svg'

export default {
  name: 'App',
  components: {
    settings
  },
  mounted() {
    document.querySelector('.CPU').classList.add('bg-blue-600');
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