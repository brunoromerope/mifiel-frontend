<template>
    <v-container class="bg-surface-varian mt-5">
        <v-row class="text-center mt-5">
            <v-col cols="4" offset-md="4">
                <div>
                    <img src="/favicon.png" alt="">
                </div>
            </v-col>
        </v-row>
        <v-row class="text-center mt-5">
            <v-col class="mt-5" offset-md="4" md="4">
                <v-card>
                    <v-card-title class="headline">Crear cuenta</v-card-title>
                    <v-card-text>
                    <v-text-field
                        label="Email"
                        type="email"
                        v-model="loginForm.email"
                    ></v-text-field>
                    <v-text-field
                        label="Contraseña"
                        type="password"
                        v-model="loginForm.password"
                    ></v-text-field>
                    <v-text-field
                        label="Re-ingresa contraseña"
                        type="password"
                        v-model="loginForm.retyped"
                    ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-container>
                            <v-row>
                                <v-col md="4" offset-md="4">
                                    <v-btn :disabled="!validPassword" class="btn" @click="register">Crear cuenta</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="4" offset-md="4">
                                    <div>
                                        Ya tienes cuenta
                                    </div>
                                    <v-btn @click="goTo">Ingresa</v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            loginForm: {
                email: '',
                password: null,
                retyped: null
            }
        };
    },
    computed: {
        validPassword () {
            return this.loginForm.password && this.loginForm.retyped && this.loginForm.password === this.loginForm.retyped;
        }
    },
    methods: {
        register() {
            axios.post(this.$store.getters.url + '/auth/register', {email: this.loginForm.email, password: this.loginForm.password})
            .then(response => {
                if (response.data) {
                    this.$store.dispatch('setUser', response.data.user);
                    this.$router.push('/create');
                }
            }).catch(error => {
                if (error.response.data.message){
                    alert(error.response.data.message);
                }
                console.log('Error al registrarse:',error)
            });
        },
        goTo () {
            this.$router.push('/login');
        }
    }
};
</script>

<style>
    .btn {
        background-color: #14D0F6;
    }
</style>