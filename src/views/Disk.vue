<template>
    <div class="grid grid-cols-1">
       <div class="grid grid-cols-2 p-2 gap-2" style="grid-template-columns: 16% 84%;"
       v-for="(item,index) in disk" :key="index">
            <div class="flex items-center p-2 shadow hover:bg-gray-100 transition duration-300 transform hover:-translate-y-1 hover:scale-110" style="height: 8.5rem">
                <img :src="item.type === 'SSD' ? require('../assets/SSD.png') : require('../assets/HDD.png')" width="100">
            </div>
            <div class="grid grid-cols-4 gap-1" :key="index">
                <div class="col-span-2 shadow p-2">
                    <div class="text-md font-normal">Nome do disco</div>
                    <div class="text-lg font-medium">{{item.name}}</div>
                </div>
                <div class="col-span-2 shadow p-2">
                    <div class="text-md font-normal">Interface</div>
                    <div class="text-lg font-medium">{{item.type}} {{item.interfaceType}}</div>
                </div>
                <div class="shadow p-2">
                    <div class="text-md font-normal">Tamanho</div>
                    <div class="text-lg font-medium">{{(item.size / 1e+9).toFixed()}} GB</div>
                </div>
                <div class="shadow p-2">
                    <div class="text-md font-normal">Tipo</div>
                    <div class="text-lg font-medium">{{item.diskType}}</div>
                </div>
                <div class="shadow p-2">
                    <div class="text-md font-normal">Usado</div>
                    <div class="text-lg font-medium">{{(item.used / 1e+9).toFixed()}} GB</div>
                </div>
                <div class="shadow p-2">
                    <div class="text-md font-normal">Disponível</div>
                    <div class="text-lg font-medium">{{((item.size / 1e+9) - (item.used / 1e+9)).toFixed()}} GB</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Disk',
    data: () => ({
        disk: []
    }),
    async created() {
        this.$ipcRenderer.send('disk-info');
        await this.$ipcRenderer.on('disk-reply', (event,data) => {
            const {type, size, name, interfaceType} = data.diskLayout[0];
            const {type: diskType, used} = data.disk[0];
            this.disk.push({type, size, name, interfaceType, used, diskType});
        });
    }
}
</script>