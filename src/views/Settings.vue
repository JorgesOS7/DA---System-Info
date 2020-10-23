<template>
    <div class="grid grid-cols-2">
        <div>Exportar dados</div>
        <div class="">
            <div class="flex flex-col items-center">
                <div class="flex p-2 shadow-md rounded space-x-1">
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
    mounted() {
        this.$bus.$emit('loader-hide');
    }
}
</script>