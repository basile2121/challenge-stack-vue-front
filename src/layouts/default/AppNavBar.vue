<template>
  <div id="myTopnav" class="topnav">
    <router-link flat to="/">Accueil</router-link>
    <router-link v-if="userStore.user" flat to="/recipes">Liste des recettes</router-link>
    <router-link v-if="userStore.user === undefined" flat to="/login">Connexion</router-link>
    <router-link v-if="!userStore.user" flat to="/register">Inscription</router-link>
    <a v-if="userStore.user" flat @click="onLogout">Déconnexion</a>
    <a v-if="userStore.user">Connecté en tant que : {{ userStore.user.firstName }} {{ userStore.user.lastName }}</a>
    <a class="icon" @click="openBurgerMenu">
      <v-icon color="purple-darken-2" icon="mdi-dialpad" size="large"></v-icon>
    </a>
  </div>
</template>

<script lang="ts">
import {useUserStore} from '@/stores/user';
import {useRouter} from 'vue-router';

export default {
  name: "AppNavBar",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const openBurgerMenu = () => {
      let navBar = document.getElementById("myTopnav");
      if (navBar.className === "topnav") {
        navBar.className += " responsive";
      } else {
        navBar.className = "topnav";
      }
    };
    const onLogout = () => {
      userStore.logout();
      userStore.user = {}
      router.push("/login");
    };

    return {
      userStore,
      onLogout,
      openBurgerMenu
    };

  }
};
</script>
<style>
.topnav {
  overflow: hidden;
  background-color: #209eff;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: #008df9;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }

  .topnav a:not(:nth-child(2)) {
    display: none;
  }

  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }

  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }

  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
