<template>
  <v-app>
    <app-nav-bar></app-nav-bar>
    <default-view></default-view>
    <footer-component></footer-component>
  </v-app>
</template>

<script lang="ts" setup>
  import AppNavBar from './AppNavBar.vue'
  import DefaultView from './View.vue'
  import FooterComponent from '../../components/Footer.vue'
</script>
