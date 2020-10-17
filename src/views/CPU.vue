<template>
  <div class="grid grid-cols-2 p-2" style="grid-template-columns: 15% auto;">
    <div class="p-2 flex items-center shadow hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 hover:scale-110 ">
      <img :src="cpu.manufacturer === 'AMD' ? require('../assets/AMD-CPU.png') :  require('../assets/Intel-CPU.png')" width="100">
    </div>
    <div class="grid grid-cols-4 gap-2 p-2">
      <div class="col-span-4 p-2 shadow-xs hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Processador</div>
        <div class="text-lg font-medium">{{cpu.brand}}</div>
      </div>
      <div class="p-2 shadow-xs hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Clock</div>
        <div class="text-lg font-medium">{{cpu.speedmax}} Ghz</div>
      </div>
      <div class="p-2 shadow-xs hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Uso Atual</div>
        <div class="text-lg font-medium">{{(currentSpeed).toFixed()}}%</div>
      </div>
      <div class="p-2 shadow-xs hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Núcleos</div>
        <div class="text-lg font-medium">{{cpu.cores}}</div>
      </div>
      <div class="p-2 shadow-xs hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Núcleos Logicos</div>
        <div class="text-lg font-medium">{{cpu.physicalCores}}</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'CPU',
  data: () => ({
    cpu: null,
    currentSpeed: 0
  }),
  async created() {
    this.$ipcRenderer.send('cpu-info');

    await this.$ipcRenderer.on('cpu-reply', (event,data) => this.cpu = data);

    setInterval(() => this.$ipcRenderer.send('cpu-percentage'),1500);

    await this.$ipcRenderer.on('cpu-percentage-reply', (event,data) => this.currentSpeed = data);
  }
}
</script>
