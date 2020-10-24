<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="">
            <div class="flex flex-col items-center text-center p-4 space-y-2">
                <div>
                    <div class="text-md font-light">Empresa</div>
                    <div class="text-lg font-medium">{{params.empresa}}</div>
                </div>
                <div>
                    <div class="text-md font-light">Desktop</div>
                    <div class="text-lg font-medium">{{params.desktop}}</div>
                </div>
                <div>
                    <button class="flex items-center space-x-2 bg-blue-500 shadow-md hover:shadow-lg focus:outline-none text-white p-2 rounded transition duration-100"
                    @click="exportMachine">
                        <v-icon name="share" class="w-5 h-5"></v-icon>
                        <span>Exportar</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="mt-20">
            <div class="flex flex-col items-center">
                <div class="flex p-2 shadow rounded space-x-1">
                    <div class="flex items-center"><img :src="require('../assets/logo-DA.png')" class="w-24 h-24 shadow rounded-full p-2 select-none"></div>
                    <div class="p-2 select-none">
                        <div class="font-light">Autor: <span class="font-normal select-text">{{$appInfo.author}}</span></div>
                        <div class="font-light">Email: <span  class="font-normal select-text">{{$appInfo.email}}</span></div>
                        <div class="font-light">App: <span class="font-normal select-text">{{$appInfo.nameApp}}</span></div>
                        <div class="font-light">Versão: <span class="font-normal select-text">{{$appInfo.version}}</span></div>
                        <div class="font-light">Site: <span class="font-normal select-text">{{$appInfo.homepage}}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Settings',
    data: () => ({
        params: {},
        machine: []
    }),
    methods: {
        exportMachine() {
            this.$bus.$emit('loader-show');
            this.$ipcRenderer.send('export-machine');
        }
    },
    mounted() {
        this.$ipcRenderer.on('export-reply', async (event,data) => {
            this.machine = await data;
            this.$bus.$emit('loader-hide');
        })
        this.$bus.$emit('loader-hide');
        this.params = JSON.parse(localStorage.getItem('Params'));
    }
}
</script>