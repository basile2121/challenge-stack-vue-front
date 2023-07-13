<template>
  <v-footer class="d-flex flex-column">
    <div class="bg-teal d-flex w-100 align-center px-2">
      <span style="font-size: 12px">Site réalisé par Basile REGNAULT / Walid HALLOULI / Fabien PONCET / Bilal BOUTERBIAT</span>
      <v-spacer></v-spacer>

      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-4"
        size="small"
        variant="plain"
      ></v-btn>
    </div>

    <div class="mb-1 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — Calculator de calorie
    </div>
  </v-footer>
</template>


<script>
name = "FooterComponent"
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

<style>
footer {
  padding: 0 !important;
  flex: 0 !important;
  margin-bottom: -78px !important;
}
</style>
