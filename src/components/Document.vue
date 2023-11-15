<template>
    <v-container>
        <v-card :class="info.state">
            <v-card-title>
                <v-icon icon="mdi-file-document" />
                {{ info.name }}
            </v-card-title>
            <v-card-text class="text-right">
                <h3>
                    {{ status[info.state] }}
                </h3>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        props: {
            info: Object,
        },
        data () {
            return {
                status: {
                    'pending': 'Pendiente',
                    'completed': 'Finalizado'
                }
            }
        } 
    }

</script>

<style>
    .pending {
        background-color: #F4E4BA;
    }

    .pending:hover {
        cursor: pointer;
    }

    .completed {
        background-color: #9DF7E5;
    }

    .completed:hover {
        cursor: pointer;
    }
</style>