<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12">
                <v-container>
                    <v-table>
                        <thead>
                            <th class="text-left">Nombre de archivo</th>
                            <th class="text-left">Fecha de creacion</th>
                            <th class="text-left">Estatus</th>
                            <th class="text-left">Ver</th>
                        </thead>
                        <tbody>
                            <tr v-for="doc in sortedDocuments" :key="doc.id">
                                <td>{{ doc.name }}</td>
                                <td>{{ formatDate(doc.created_at)}}</td>
                                <td>{{ status[doc.state] }}</td>
                                <td><v-btn :class="`button ${doc.state}`" @click="openDocument(doc.id)">{{ btnMessage[doc.state] }}</v-btn></td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import Document from '../components/Document.vue';
export default {
    components: {
        'document': Document
    },
    data() {
        return {
            documents: [],
            status: {
                'pending': 'Pendiente',
                'completed': 'Finalizado'
            },
            btnMessage: {
                'pending': 'Firmar',
                'completed': 'Ver'
            }
        };
    },
    created: function () {
        this.getDoctos();
    },
    computed: {
        user () {
            return this.$store.getters.user;
        },
        sortedDocuments () {
            return this.documents.reverse();
        }
    },
    methods: {
        async getDoctos () {
            try{
                
                const response = await axios.get(this.$store.getters.url+'/document', {
                    headers:{
                        'Authorization': `Bearer ${this.user.token}`
                    }
                });
                
                if (response.data) {
                    this.documents = response.data
                }
                
            } catch (error) {
                console.log('Error fetching PDF ', error);
            }
        },
        openDocument (id) {
            this.$router.push('/sign/'+id)
        },
        formatDate (dte) {
            const date = new Date(dte);

            return date.toLocaleDateString();
        }
    }
};
</script>

<style>

    .button {
        width: 120px;
    }

    .pending {
        background-color: #e3cf5f;
    }

    .completed {
        background-color: #14D0F6;
    }
</style>