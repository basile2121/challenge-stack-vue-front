<template>
   <v-toolbar color="blue" app>
    <v-toolbar-title>
      <router-link to="/" style="text-decoration: none; cursor: pointer; color: white;">
        Calculator
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <router-link class="v-btn text-white" to="/recipes"><v-btn> Recettes </v-btn> </router-link>
      <router-link class="v-btn text-white" v-if="userStore.user === undefined" flat to="/login"> <v-btn> Connexion</v-btn></router-link>
      <router-link class="v-btn text-white" v-if="!userStore.user" flat to="/register"><v-btn>Inscription</v-btn></router-link>

      <v-btn v-if="userStore.user" @click="logout" flat >se déconnecter</v-btn>
      <v-btn v-if="userStore.user" >Bienvenue {{ userStore.user.firstName }}</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router';
export default {
name: "App",
setup() {
  const router = useRouter();
  const userStore = useUserStore();

    const logout = () => {
      userStore.logout();
      userStore.user = {}
      router.push("/login");
    };
      return {
      userStore,
      logout
    };

  }
};
</script>
<style>
  .v-toolbar{
    margin-bottom: 10px;
  }
</style>
