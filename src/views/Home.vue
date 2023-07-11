<template>
  <HelloWorld />
  <p >{{ store.recipe }}</p>
</template>

<script lang="ts" setup>
  import HelloWorld from '@/components/HelloWorld.vue'
  import { useRecipeStore } from '@/stores/recipe'

  const store = useRecipeStore()
  console.log(store.recipe);
  

  // doubleCount()
  
</script>
