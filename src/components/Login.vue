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
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
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
  export default {
    data: () => ({
      visible: false,
    }),
  }
</script>