<template>
    <div class="grid grid-cols-1" v-if="graphics.length > 0 && displays.length > 0">
        <div class="grid gap-2">
            <div class="grid grid-cols-2 p-2 gap-2" style="grid-template-columns: 16% 84%;"
            v-for="(item,index) in graphics" :key="index">
                <div class="flex items-center p-2 shadow hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 hover:scale-110 select-none" style="height: 8.5rem">
                    <img :src="item.vendor.includes('Advanced') ?  require('../assets/AMD-Graphics.png') : item.vendor.includes('Intel') ? require('../assets/Intel-Graphics.png') : item.vendor.includes('Nvidia') ? require('../assets/Nvidia-Graphics.png') : require('../assets/GPU-not-found.png')" width="100">
                </div>
                <div class="grid grid-cols-3 gap-1">
                    <div class="col-span-3 shadow p-2 hover:bg-gray-100 transition duration-300">
                        <div class="text-md font-normal select-none">Modelo</div>
                        <div class="text-lg font-medium">{{item.model}}</div>
                    </div>
                    <div class="col-span-2 shadow p-2 hover:bg-gray-100 transition duration-300">
                        <div class="text-md font-normal select-none">Fabricante</div>
                        <div class="text-lg font-medium">{{item.vendor}}</div>
                    </div>
                    <div class="shadow p-2 hover:bg-gray-100 transition duration-300">
                        <div class="text-md font-normal select-none">VRAM</div>
                        <div class="text-lg font-medium">{{item.vram}} MB</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="p-2 space-y-2 select-none">
            <div class="text-2xl font-light">Informações do monitor</div>
            <div class="flex flex-row space-x-2 ">
                <div class="p-2 shadow w-5/12 hover:bg-gray-100 transition duration-300">
                    <div class="text-md font-normal">Resolução</div>
                    <div class="text-lg font-medium">{{displays[0].resolutionx}}x{{displays[0].resolutiony}}</div>
                </div>
                <div class="p-2 shadow hover:bg-gray-100 transition duration-300">
                    <div class="text-md font-normal">Taxa de Atualização</div>
                    <div class="text-lg font-medium">{{displays[0].currentRefreshRate}} Hz</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Graphics',
    data: () => ({
        graphics: [],
        displays: []
    }),
    async created(){
        this.$bus.$emit('loader-show');        
        this.$ipcRenderer.send('graphics-info');
        await this.$ipcRenderer.on('graphics-reply', (event,data) => {
            this.graphics = data.controllers;
            this.displays = data.displays;
        })
    },
    watch: {
        'graphics.length'(a) {
            if(a > 0 && this.displays.length > 0)
                return this.$bus.$emit('loader-hide')
        }
    }
}
</script>