<template>
  <v-app-bar id="appbar">
    <v-app-bar-title>
      

      <h3> <v-icon icon="mdi-file-sign" /> MIFIEL WIDGET</h3>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <h4 v-if="user">{{ user.email }}</h4>
    <v-spacer></v-spacer>
    <v-btn @click="goTo('/create')"><v-icon icon="mdi-file-document-plus"></v-icon> Crear </v-btn>
    <v-btn class="ml-5" @click="goTo('/docs')"> <v-icon icon="mdi-file-document-multiple"></v-icon> Documentos </v-btn>
    <v-btn class="ml-5" color="warning" @click="logOut"><v-icon icon="mdi-exit-to-app"></v-icon> Salir </v-btn>
  </v-app-bar>
</template>

<script>
  export default {
    methods: {
      goTo(endpoint) {
        this.$router.push(endpoint);
      },
      logOut() {
        this.$store.dispatch('setUser', null);
        this.$router.push('/login')
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>

<style>

#appbar {
  background-color: #14D0A6;
}

</style>
