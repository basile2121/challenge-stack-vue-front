<template>
   <v-toolbar color="blue" app>
    <v-toolbar-title>
      <router-link to="/" style="text-decoration: none; cursor: pointer; color: white;">
        {{ appTitle }}
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.path">
        {{ item.title }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">

export default {
name: "App",
data(){
  return {
    appTitle: 'Accueil',
    menuItems: [
        { title: 'Recettes', path: '/recipes', icon: 'home' },
        { title: 'Inscription', path: '/register', icon: 'face' },
        { title: 'Connexion', path: '/login', icon: 'lock_open' }
   ]
  }
},
};
</script>
<style>
  .v-toolbar{
    margin-bottom: 10px;
  }
</style>
