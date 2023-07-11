<template>
<v-btn 
        color="green"
        class="mx-auto mb-3"
        @click="openDialog(recipe)"
      >
        Référentiel
         <v-tooltip
        activator="parent"
        location="end"
      >Exporter le référentiel</v-tooltip>
      </v-btn>
  <div class="text-center">
    
    <v-dialog
      v-model="dialog"
      width="40%"
      class="px-10"
    >

      <v-card>
        <v-card-text v-for="ingredient in recipe.ingredients"
          :key="ingredient.name">
            <FormIngredient :ingredient="ingredient"/>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
  import { ref } from 'vue'
  import FormIngredient from "../components/FormIngredient"
  import { useRecipeStore } from '@/stores/recipe';
  export default {
    name: "DialogIngredient",
    components: {
        FormIngredient
    },
    props: {
        recipe:Object,
    },
    setup () {
      
      const store = useRecipeStore();
      const dialog = ref(false)
      const openDialog = (recipe: any) => {
        store.selectedRecipe = {}
        dialog.value = true;
        store.selectedRecipe = recipe;
      }
      
      return {
        openDialog,
        dialog,
      }
    },
  }
</script>