<template>
  <div class="grid grid-cols-1 p-2" v-if="mem !== null">
    <div class="p-2 grid grid-cols-4 gap-2">
      <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Memória Total</div>
        <div class="text-lg font-medium">{{MbtoGb(mem.totalMemMb / 1000)}} GB</div>
      </div>
      <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Memória em Uso</div>
        <div class="text-lg font-medium">{{MbtoGb(mem.usedMemMb / 1000)}} GB</div>
      </div>
      <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Memória Livre</div>
        <div class="text-lg font-medium">{{MbtoGb(mem.freeMemMb / 1000)}} GB</div>
      </div>
      <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
        <div class="text-md font-normal">Memória Livre %</div>
        <div class="text-lg font-medium">{{(mem.freeMemPercentage).toFixed()}}%</div>
      </div>
    </div>
    <div class="p-2">
      <div class="text-2xl font-light">Detalhes da memoria</div>
      <div class="grid grid-cols-2 gap-2" style="grid-template-columns: 25% 75%;">
        <div class="space-y-8">
          <div class="p-2">
            <select class="bg-white rounded shadow-xs p-1 w-full focus:outline-none" v-model="memSelected">
              <option v-for="(item,index) in memLayout" :key="index" :value="item">{{item.bank}}</option>
            </select>
          </div>
          <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
            <div class="text-md font-normal">Modo de Operação</div>
            <div class="text-lg font-medium">{{memLayout.length == 2 ? 'Dual Channel' : 'Single Channel'}}</div>
          </div>
        </div>
        <div v-if="memSelected" class="grid grid-cols-3 gap-2">
          <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
            <div class="text-md font-normal">Channel</div>
            <div class="text-lg font-medium">{{memSelected.bank}}</div>
          </div>
          <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
            <div class="text-md font-normal">Clock</div>
            <div class="text-lg font-medium">{{memSelected.clockSpeed}} Ghz</div>
          </div>
          <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
            <div class="text-md font-normal">Fabricante</div>
            <div class="text-lg font-medium">{{memSelected.manufacturer}}</div>
          </div>
          <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
            <div class="text-md font-normal">Tamanho</div>
            <div class="text-lg font-medium">{{(memSelected.size / 1e+9).toFixed()}} GB</div>
          </div>
          <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
            <div class="text-md font-normal">Tipo</div>
            <div class="text-lg font-medium">{{memSelected.type}}</div>
          </div>
          <div class="shadow p-2  hover:bg-gray-100 transition duration-300">
            <div class="text-md font-normal">Voltagem</div>
            <div class="text-lg font-medium">{{memSelected.voltageConfigured}} v</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mem',
  data: () => ({
    mem: null,
    memLayout: [],
    memSelected: 0,
    MbtoGb: x => x.toFixed(1)
  }),
  async created() {
    this.$bus.$emit('loader-show');
    setInterval(() => this.$ipcRenderer.send('mem-info'), 1500);
    await this.$ipcRenderer.on('mem-reply', (event,data) => this.mem = data);

    this.$ipcRenderer.send('mem-percentage');
    await this.$ipcRenderer.on('mem-percentage-reply', (event,data) => {
      this.memLayout = data;
      this.memSelected = this.memLayout[0];
    })
  },
  watch: {
    'memLayout.length'(a) {
      if(a > 0)
        return setTimeout(() => this.$bus.$emit('loader-hide'), 1000)
    }
  }
}
</script>