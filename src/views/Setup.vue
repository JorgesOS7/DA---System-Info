<template>
    <div class="Setup fixed top-0 left-0 w-screen h-screen bg-blue-600 flex p-12 justify-center items-center">
        <Modal v-show="modal == true" @hide-modal="modal = false"/>
        <div class="flex justify-center bg-white w-2/3 h-full p-2 rounded shadow">
            <div class="flex flex-col items-center space-y-12 w-full">
                <div class="text-3xl text-center">Bem vindo</div>
                <div class="flex flex-col w-3/4 space-y-2">
                    <div class="">
                        <div class="text-md">Nome da Empresa</div>
                        <div class="p-2">
                            <input type="text" class="bg-gray-200 p-2 w-full text-lg uppercase focus:outline-none rounded font-medium border border-white focus:border-blue-600"
                            v-model="setup.empresa">
                        </div>
                    </div>
                    <div>
                        <div class="text-md">Desktop</div>
                        <div class="p-2">
                            <input type="text" class="bg-gray-200 p-2 w-full text-lg uppercase focus:outline-none rounded font-medium border border-white focus:border-blue-600"
                            v-model="setup.desktop">
                        </div>
                    </div>
                    <div class="flex flex-col mx-auto py-6 space-y-2">
                        <button class="bg-blue-600 flex space-x-2 items-center text-white rounded p-3 text-xl focus:outline-none hover:bg-blue-500 transition duration-300"
                        @click="saveParams">
                            <span>Continuar</span>
                            <v-icon name="arrow-right" class="w-5 h-5"></v-icon>
                        </button>
                        <button class="border text-black rounded p-1 text-md focus:outline-none hover:bg-gray-200 transition duration-300" @click="close">Sair</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Setup',
    components: {
        Modal: () => import('../components/Modal.vue')
    },
    data: () => ({
        setup: {
            empresa: '',
            desktop: ''
        },
        modal: false
    }),
    methods: {
        async saveParams() {
            const {empresa, desktop} = this.setup;
            if(this.setup.empresa !== "" && this.setup.desktop !== "") {               
                this.setup.empresa = empresa.toUpperCase();
                this.setup.desktop = desktop.toUpperCase();
                await localStorage.setItem('Params', JSON.stringify(this.setup));
                this.$router.push({name: 'CPU'});
            }
            else
                this.modal = true
        },
        close() {
            const {remote} = require('electron');
            remote.BrowserWindow.getFocusedWindow().close();
        }
    },
    mounted() {
        this.$bus.$emit('loader-hide')
    }
}
</script>