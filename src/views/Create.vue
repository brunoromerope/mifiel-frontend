<template>
    <v-container>
        <v-row justify="center" class="mt-5">
            <v-col class="text-center mt-5">
                <v-btn class="btn" @click="createPDF">Crear PDF</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="12">

                <div id="mifiel-widget-container"></div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            widget_id: null,
            base64: null
        };
    },
    computed: {
        pdfContent () {
            return this.$store.getters.base64;
        },
        user () {
            return this.$store.getters.user;
        }
    },
    methods: {
        async createPDF () {
            try{

                const response = await axios.get(this.$store.getters.url+'/pdf', {
                    headers:{
                        'Authorization': `Bearer ${this.user.token}`
                    }
                });

                //this.$store.dispatch('setBase64Content', response.data.base64)
                this.base64 = response.data.base64;
                this.widget_id = response.data.widget_id;

                this.createWidget(this.widget_id, this.base64);
            } catch (error) {
                console.log('Error fetching PDF ', error);
            }
        },
        resetWidget () {
            let div = document.getElementById('mifiel-widget-container');
            div.innerHTML = '';
            window.mifiel = null
            this.$router.push('/docs');
        },
        createWidget (widget_id, base64pdf) {
            window.mifiel=window.mifiel||[],
            function(){
                "use strict";
                for(var e=["widget"],i=function(e){
                    return function(){window.mifiel.push([e].concat(Array.prototype.slice.call(arguments,0)))}}
                    ,t=0;t<e.length;t++){
                        var n=e[t];window.mifiel[n]||(window.mifiel[n]=i(n))
                    }
                    if(!document.getElementById("mifiel-js")){
                        var c=document.createElement("script"),o=document.getElementsByTagName("script")[0];c.type="text/javascript",c.id="mifiel-js",c.async=!0,c.src="https://app-sandbox.mifiel.com/sign-widget-v1.0.0.js?locale=es",o.parentNode.insertBefore(c,o)
                    }
                }();

                window.mifiel.widget({
                    widgetId: widget_id,
                    appendTo: 'mifiel-widget-container',
                    pdf: base64pdf,
                    successBtnText: 'Continuar',
                    onSuccess: {
                        // Código a ejecutar después de que el firmante firme correctamente y haga clic en el botón,
                        // puede ser una URL como 'mifiel.com' o una función()
                        callToAction: this.resetWidget,
                    }
                });
        }
    }
};
</script>

<style>
    .btn {
        background-color: #14D0F6;
    }
</style>