<template>
      <v-btn 
        color="green"
        class="mx-auto mb-3"
        v-if="userStore.user._id == recipe.user._id"
        @click="openDialog(recipe)"
      >
        Référentiel
         <v-tooltip
        activator="parent"
        location="end"
      >Exporter le référentiel</v-tooltip>
      </v-btn>
      <div v-else class="text-subtitle-1 font-weight-light font-italic mx-auto">Recette postée par {{recipe.user.firstName}}</div>
    
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
  import { useUserStore } from '@/stores/user';

  export default {
    name: "DialogIngredient",
    components: {
        FormIngredient
    },
    props: {
        recipe:Object,
    },
    setup () {
      const userStore = useUserStore();
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
        userStore,
      }
    },
  }
</script>