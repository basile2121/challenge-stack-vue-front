<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-card-item>
      <v-card-title class="text-center" color="blue">{{ recipe.name }}</v-card-title>
    </v-card-item>

    <v-divider class="mx-4 mb-1"></v-divider>
    <v-card-title>Aliments
      <v-icon class="pb-2" color="red-accent-2" icon="mdi-food" size="xsmall"/>
      <v-chip color="orange"> Pour {{ recipe.number_of_person }} personnes</v-chip>
      <v-chip v-if="userStore.user._id == recipe.user._id" class="float-right" color="red"
              @click="deleteRecipe(recipe)">
        <v-icon class="px-2" icon="mdi-trash-can-outline" size="large"/>
        <v-tooltip
          activator="parent"
          location="top"
        >Supprimer la recette
        </v-tooltip>
      </v-chip>
    </v-card-title>

    <v-card-text>
      <v-table class="aliments">
        <thead>
        <tr>
          <th>
            Nom
          </th>
          <th>
            Quantité
          </th>
          <th>
            Protéine/100g
          </th>
          <th>
            Glucides/100g
          </th>
          <th>
            Lipides/100g
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="ingredient in this.recipe.ingredients"
          :key="ingredient.name"
        >
          <td class="font-weight-bold">{{ ingredient.name }}</td>
          <td>{{ ingredient.quantity }}{{ ingredient.unity }}</td>
          <td>{{ ingredient.protein_per_100 }}</td>
          <td>{{ ingredient.carbohydrate_per_100 }}</td>
          <td>{{ ingredient.lipid_per_100 }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Apports nutritionnels
      <v-icon class="pb-1" color="red-accent-2" icon="mdi-chart-bar" size="xsmall"/>
    </v-card-title>

    <div class="px-4">

      <v-chip v-if="!displayAnalyze" class="analyze" color="purple" @click="analyzeRecipe(recipe)">Voir Analyse</v-chip>

      <v-chip-group v-if="displayAnalyze && analyzeResponse !== null">
        <v-chip>Total KCal : {{ analyzeResponse.totalCalorique }}</v-chip>

        <v-chip>Total proteines : {{ analyzeResponse.totalProtein }}</v-chip>

        <v-chip>Total glucides : {{ analyzeResponse.totalGlucide }}</v-chip>

        <v-chip>Total lipides : {{ analyzeResponse.totalLipide }}</v-chip>
      </v-chip-group>
    </div>
    <v-divider class="mx-4 my-3"></v-divider>
    <v-card-title>Etapes
      <v-icon class="pb-1" color="red-accent-2" icon="mdi-book-open-page-variant" size="xsmall"/>
    </v-card-title>
    <v-card-text>
      <v-item-group selected-class="bg-purple">
        <v-item
          v-for="step in this.recipe.steps.slice(0, 2)"
          :key="step.order"
        >
          <div class="text-subtitle-1 text-decoration-underline">Etape {{ step.order }} :</div>
          <div class="text-body-1 my-2 "> {{ step.description }}</div>

        </v-item>
      </v-item-group>
      <v-expand-transition>
        <div v-if="displaySteps">

          <v-item-group selected-class="bg-purple">
            <v-item
              v-for="step in this.recipe.steps.slice(2,recipe.steps.length)"
              :key="step.order"
            >
              <div class="text-subtitle-1 text-decoration-underline">Etape {{ step.order }} :</div>
              <div class="text-body-1 my-2 "> {{ step.description }}</div>

            </v-item>
          </v-item-group>


        </div>
      </v-expand-transition>
    </v-card-text>
    <v-divider v-if="recipe.steps.length > 2" class="mx-4 my-3"></v-divider>
    <v-card-actions v-if="recipe.steps.length > 2">

      <v-btn
        class="mx-auto"
        color="blue"
        variant="text"
        @click="displaySteps = !displaySteps"
      >
        {{ !displaySteps ? 'Voir plus' : 'Voir moins' }}
        <v-tooltip
          activator="parent"
          location="end"
        >Voir le recette
        </v-tooltip>
      </v-btn>

    </v-card-actions>
    <v-divider class="mx-4 my-3"></v-divider>
    <v-card-actions>
      <DialogIngredient :recipe="recipe"/>
    </v-card-actions>
  </v-card>

</template>
<script lang="ts">

import {ref} from 'vue'
import DialogIngredient from "../components/DialogIngredient"
import {useUserStore} from '@/stores/user';
import {useRecipeStore} from '@/stores/recipe';

export default {
  name: "CardRecipe",
  components: {
    DialogIngredient
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    }
  },
  setup() {
    const userStore = useUserStore();
    const recipeStore = useRecipeStore();

    const displaySteps = ref(false)
    const displayAnalyze = ref(false)
    const analyzeResponse = ref(null)

    const analyzeRecipe = async (recipe: any) => {
      displayAnalyze.value = true;
      analyzeResponse.value = await recipeStore.analyzeRecipe(recipe)
    }

    const deleteRecipe = (recipe: any) => {
      const res = recipeStore.deleteRecipe(recipe);
      if (res.status === 200) {
        recipeStore.recipes.splice(recipe._id, 1)
      }
    }
    return {
      displaySteps,
      displayAnalyze,
      userStore,
      deleteRecipe,
      analyzeRecipe,
      analyzeResponse,
    }
  }
}
</script>

<style>
.analyze:hover {
  cursor: pointer;
}
</style>
