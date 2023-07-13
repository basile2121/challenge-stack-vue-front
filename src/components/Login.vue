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
        v-model="email"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        required
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Mots de passe
      </div>
      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Entrez votre mots de passe"
        prepend-inner-icon="mdi-lock-outline"
        required
        variant="outlined"
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
        <router-link class="text-blue text-decoration-none" flat to="/register">S'inscrire
          <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import {useUserStore} from '@/stores/user';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    let email = ref('');
    let password = ref('');

    const login = () => {
      userStore.login(email.value, password.value);
      router.push('/')
    };

    return {
      user: userStore.user,
      login,
      email,
      password,
      visible: false
    };
  },
}
</script>
