<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <div v-if="userIsLogged">
       <v-toolbar-title>Holaaa! {{this.$store.state.user.nombre}} {{this.$store.state.user.apellido}}</v-toolbar-title>
    </div>
    <div v-else>
      <p><strong>Logueate querido empleado</strong></p>
    </div>
    <v-spacer></v-spacer>
    <div v-if="userIsLogged">
       <router-link
        to="/usuarios"
        class="mr-5"
       ><v-icon>mdi-account-search</v-icon></router-link>
       <router-link
        to="/dependencias"
        class="mr-5"
       ><v-icon>mdi-account-group</v-icon></router-link>
       <v-btn @click="logout" right>Deslogueate aca!</v-btn>
    </div>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    userIsLogged(){
      return this.$store.state.user.email!='';
    }
  },
  methods: {
    logout(){
      this.$store.dispatch('logout');
      this.$router.push('/')
    }
  }
};
</script>
