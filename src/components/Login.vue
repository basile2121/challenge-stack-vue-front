<template>
  <div>
    <v-card
      class="mx-auto pa-12 pb-8 my-8"
      elevation="8"
      max-width="448"
      rounded="lg"
      title="Se connecter"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Mots de passe
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Entrez votre mots de passe"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        v-model="password"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="login"
      >
        Se connecter
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          href="register"
          rel="noopener noreferrer"
        >S'inscrire<v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
  import { useUserStore } from '../stores/user';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    setup() {
      const router = useRouter();
      const userStore = useUserStore();
      let email = ref(null);
      let password = ref(null);


      const login = () => {
        console.log(email.value, password.value);
        userStore.login(email.value, password.value);
        router.push('/')
      };

      const logout = () => {
        userStore.logout();
      };

      return {
        user: userStore.user,
        login,
        logout,
        email,
        password,
        visible: false
      };
  },

  }
</script>