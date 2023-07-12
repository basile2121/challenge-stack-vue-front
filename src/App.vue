<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useUserStore } from './stores/user';

const userStore = useUserStore();
const userLocal = localStorage.getItem('user') || undefined;
if(userLocal){
  userStore.user = JSON.parse(userLocal);
}
</script>
