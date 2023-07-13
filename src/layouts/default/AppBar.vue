<template>

    <div class="topnav" id="myTopnav" >
      <router-link flat to="/">Calculator </router-link>
      <router-link flat to="/">Recettes </router-link>
      <router-link v-if="userStore.user === undefined" flat to="/login">Connexion</router-link>
      <router-link v-if="!userStore.user" flat to="/register">Inscription</router-link>
      <a v-if="userStore.user" @click="logout" flat >se déconnecter</a>
      <a v-if="userStore.user" >Bienvenue {{ userStore.user.email }}</a>
      <a class="icon" @click="myFunction" ><v-icon size="large" color="purple-darken-2" icon="mdi-dialpad"></v-icon></a>
    </div>
</template>

<style>

.topnav {
  overflow: hidden;
  background-color: #209eff;
}

.topnav a {
  float: right;
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
  .topnav a:not(:first-child) {display: none;}
  .topnav a:not(:nth-child(2)) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
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

<script lang="ts">
import { useUserStore } from '../../stores/user';
import { useRouter } from 'vue-router';
export default {
name: "App",
setup() {
  const router = useRouter();
  const userStore = useUserStore();

  const myFunction = () => {
      let x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }; 
    const logout = () => {
      userStore.logout();
      userStore.user = {}
      router.push("/login");
    };

      return {
      userStore,
      logout, 
      myFunction
    };

  }
};
</script>
<style>
  .v-toolbar{
    margin-bottom: 10px;
  }
</style>
