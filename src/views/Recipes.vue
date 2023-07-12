
<template>

  <v-item-group selected-class="bg-primary">
    <v-container>
      <v-row>
        <v-col
          v-for="recipe in store.recipes"
          :key="recipe.name"
          cols="12"
        >
          <v-item>
            <CardRecipe :recipe="recipe"/>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script lang="ts">
  
  import CardRecipe from "../components/CardRecipe";
  import { useRecipeStore } from '@/stores/recipe';
  export default {
    name: "Recipes",
    components: {
        CardRecipe
    },

    setup(){
      const store = useRecipeStore();
      store.getAllRecipes();
      return {
        store,
      }
    },

  }
</script>

<style scoped>
.aliments th, .aliments td {
    text-align: center!important;
}

.v-list-item-title::after{
    content: "Etape";
}
</style>
