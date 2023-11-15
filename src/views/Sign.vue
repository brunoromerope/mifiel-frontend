<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card v-if="document">
                    <v-card-title>
                        <div class="text-center">Detalles de documento</div>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row class="mb-5" wrap>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col cols="3"><h3>ID: </h3></v-col>
                                        <v-col cols="9" class="text-right">{{ document.id }}</v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col><h4>Estatus:</h4></v-col>
                                        <v-col class="text-right">{{ status[document.state] }}</v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col><h3>External ID: </h3></v-col>
                                        <v-col class="text-right">{{ document.external_id }}</v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6">
                                    <v-row>
                                        <v-col><h4>Fecha creacion:</h4></v-col>
                                        <v-col class="text-right">{{ formatDate(document.created_at) }}</v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-row class="mt-5" v-if="document.state == 'completed'">
                                <v-col cols="4">
                                    <v-btn class="btn" @click="fetchFile(document.file_file_name)">Documento</v-btn>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn class="btn" @click="fetchFile(document.signed_filename)">Firmas</v-btn>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn class="btn" @click="showXML(document.xml_filename)">XML</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-card>
                <v-container class="mt-5">
                    <v-row justify="center">
                        <div>
                            <iframe v-if="fileData" :src="fileData"  style="width: 100vh; height: 100vh;"></iframe>
                        </div>
                    </v-row>
                </v-container>
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
            base64: null,
            id: null,
            message: null,
            document: null,
            fileData: null,
            status: {
                'pending': 'Pendiente',
                'completed': 'Firmado'
            }
        };
    },
    created: function () {
        this.id = this.$route.params.id;
        this.getDocument()
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
        async getDocument () {
            try{

                const response = await axios.get(this.$store.getters.url+'/document/'+ this.id, {
                    headers:{
                        'Authorization': `Bearer ${this.user.token}`
                    }
                });

                this.document = response.data;
                if (response?.data.state !== 'completed') {
                    this.base64 = response.data.base64;
                    this.widget_id = response.data.signers[0].widget_id;
    
                    this.createWidget(this.widget_id, this.base64);
                } else {
                    
                    this.message = 'Documento Firmado'
                }

            } catch (error) {
                console.log('Error fetching PDF ', error);
            }
        },
        fetchFile (filename) {
            /*axios.get(this.$store.getters.url + `/api/download/${this.document.external_id}/${filename}`, { responseType: 'blob'})
            .then(response => {
                const fileURL = URL.createObjectURL(new Blob([response.data]));
                this.fileData = fileURL;
            }).catch(error => {
                console.log('Error fetching the file:', error);
            })*/
            this.fileData = this.$store.getters.url + `/api/download/${this.document.external_id}/${filename}`;
        },
        showXML(filename) {
            window.open(this.$store.getters.url + `/api/download/${this.document.external_id}/${filename}`);
        },
        createWidget (widget_id, base64pdf) {
            window.mifiel=window.mifiel||[],
            function(){
                "use strict";
                for(var e=["widget"],
                    i=function(e){return function(){window.mifiel.push([e].concat(Array.prototype.slice.call(arguments,0)))}}
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
        },
        resetWidget () {
            let div = document.getElementById('mifiel-widget-container');
            div.innerHTML = '';
            window.mifiel = null
            this.$router.push('/docs');
        },
        formatDate(dateString) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(dateString).toLocaleDateString(undefined, options);
        }
    }
};
</script>

<style>

    .btn {
        background-color: #14D0F6;
    }
</style>