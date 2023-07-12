<template>
  <v-card
    class="mx-auto pa-12 pb-8 my-8"
    elevation="8"
    max-width="448"
    rounded="lg"
    title="S'inscrire"
  >
    <v-container>
      <v-text-field
        color="primary"
        label="Prénom"
        variant="outlined"
        v-model="firstName"
        required
      ></v-text-field>

      <v-text-field
        v-model="lastName"
        color="primary"
        label="Nom"
        variant="outlined"
        required
      ></v-text-field>

      <v-text-field
        v-model="date"
        color="primary"
        label="Date de naissance"
        variant="outlined"
        type="date"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="outlined"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Mots de passe"
        placeholder="Enter your password"
        type="password"
        variant="outlined"
        required
      ></v-text-field>

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="J'accepter les conditions du site"
        required
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success"
        block
        size="large"
        variant="tonal"
        @click="register"
      >
        S'enregistrer

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import { useUserStore } from '../stores/user';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();
     let firstName = ref(null);
     let lastName= ref(null);
     let email= ref(null);
     let password= ref(null);
     let date = ref(null);
     let terms= ref(false);

    const register = () => {
      console.log(email.value);
      userStore.register(email.value, password.value, firstName.value, lastName.value, date.value);
      router.push('/')
    };

    return {
      user: userStore.user,
      register,
      firstName,
      lastName,
      email,
      password,
      date,
      terms,
    };
  },
  }
</script>