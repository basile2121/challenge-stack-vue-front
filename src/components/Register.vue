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
        v-model="first"
        color="primary"
        label="Prénom"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="last"
        color="primary"
        label="Nom"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="last"
        color="primary"
        label="Date de naissance"
        variant="outlined"
        type="date"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="outlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Mots de passe"
        placeholder="Enter your password"
        type="password"
        variant="outlined"
      ></v-text-field>

      <v-checkbox
        v-model="terms"
        color="secondary"
        label="J'accepter les conditions du site"
      ></v-checkbox>
    </v-container>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn color="success"
        block
        size="large"
        variant="tonal"
      >

        S'enregistrer

        <v-icon icon="mdi-chevron-right" end></v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
  export default {
    data: () => ({
      first: null,
      last: null,
      email: null,
      password: null,
      terms: false,
    }),
  }
</script>