<template>
    <v-footer class="d-flex flex-column">
      <div class="bg-teal d-flex w-100 align-center px-4">
        <strong>Connectez-vous sur nos réseaux sociaux !!</strong>
  
        <v-spacer></v-spacer>
  
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          :icon="icon"
          variant="plain"
          size="small"
        ></v-btn>
      </div>
  
      <div class="mb-1 bg-black text-center w-100">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </div>
    </v-footer>
  </template>

  <style>
    footer{
        padding: 0px !important;
        flex: 0px !important;
        margin-bottom: -78px !important;
    }
</style>
  <script>
    export default {
      data: () => ({
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }),
    }
  </script>