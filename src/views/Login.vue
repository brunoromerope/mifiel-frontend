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
                    <v-card-title class="headline">Ingresar</v-card-title>
                    <v-card-text>
                    <v-text-field
                        label="Email"
                        type="email"
                        v-model="loginForm.email"
                    ></v-text-field>
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="loginForm.password"
                        @keyup.enter="submitLogin"
                    ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-container>
                            <v-row>
                                <v-col md="4" offset-md="4">
                                    <v-btn :disabled="!validateForm" class="btn" @click="submitLogin">Entrar</v-btn>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col md="4" offset-md="4">
                                    <v-btn @click="register" class="btn2">Registrarse</v-btn>
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
            password: ''
            }
        };
    },
    computed: {
        validateForm() {
            // Regular expression for email validation
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            return emailPattern.test(this.loginForm.email) && this.loginForm.password !== '';
        },
    },
    methods: {
        submitLogin() {
            axios.post(this.$store.getters.url + '/auth/login', {email: this.loginForm.email, password: this.loginForm.password})
            .then(response => {
                if (response.data) {
                    let user = response.data.user;
                    user['token'] = response.data.token;
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
        register () {
            this.$router.push('/register');
        },
        
    }
};
</script>

<style>
    .btn {
        background-color: #14D0F6;
    }
</style>