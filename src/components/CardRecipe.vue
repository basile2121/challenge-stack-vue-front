<template>
      <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-card-item >
      <v-card-title class="text-center" color="blue">{{recipe.name}} </v-card-title> 
      
    </v-card-item>
    
    <v-divider class="mx-4 mb-1"></v-divider>
    <v-card-title>Aliments <v-icon size="xsmall" class="pb-2" color="red-accent-2" icon="mdi-food"/>  <v-chip color="orange"> Pour {{recipe.number_of_person}} personnes</v-chip> <v-chip class="float-right" color="red" v-if="userStore.user._id == recipe.user._id" @click="deleteRecipe(recipe)"> <v-icon size="large" class="px-2"  icon="mdi-trash-can-outline"/></v-chip> </v-card-title>
     
    <v-card-text>
<v-table class="aliments">
    <thead>
      <tr>
        <th >
          Nom
        </th>
        <th >
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
        <td>{{ ingredient.quantity }}{{ingredient.unity}}</td>
        <td>{{ ingredient.protein_per_100 }}</td>
        <td>{{ ingredient.carbohydrate_per_100 }}</td>
        <td>{{ ingredient.lipid_per_100 }}</td>

      </tr>
    </tbody>
  </v-table>   
  </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Apports nutritionnels <v-icon size="xsmall" color="red-accent-2" class="pb-1" icon="mdi-chart-bar"/></v-card-title>

    <div class="px-4">
      
      <v-chip  v-if="!displayAnalyze" color="purple" class="analyze" @click="analyzeRecipe(recipe)">Voir Analyse</v-chip>
      
      <v-chip-group v-if="displayAnalyze && analyzeResponse !== null">
        <v-chip>Total KCal : {{analyzeResponse.totalCalorique}}</v-chip>

        <v-chip>Total proteines : {{analyzeResponse.totalProtein}}</v-chip>

        <v-chip>Total glucides : {{analyzeResponse.totalGlucide}}</v-chip>

        <v-chip>Total lipides : {{analyzeResponse.totalLipide}}</v-chip>
      </v-chip-group>
    </div>
    <v-divider class="mx-4 my-3"></v-divider>
    <v-card-title>Etapes <v-icon size="xsmall" color="red-accent-2" class="pb-1" icon="mdi-book-open-page-variant"/></v-card-title>
    <v-card-text>
     <v-item-group multiple selected-class="bg-purple">
        <v-item
          v-for="step in this.recipe.steps.slice(0, 2)"
          :key="step.order"
        >
        <div class="text-subtitle-1 text-decoration-underline">Etape {{ step.order }} :</div>
        <div class="text-body-1 my-2 " color="grey"> {{ step.description }}</div>
        
        </v-item>
      </v-item-group>
      <v-expand-transition>
      <div v-if="show">
        
          <v-item-group multiple selected-class="bg-purple">
        <v-item
          v-for="step in this.recipe.steps.slice(2,recipe.steps.length)"
          :key="step.order"
        >
        <div class="text-subtitle-1 text-decoration-underline">Etape {{ step.order }} :</div>
        <div class="text-body-1 my-2 " color="grey"> {{ step.description }}</div>
        
        </v-item>
      </v-item-group>
       
        
      </div>
    </v-expand-transition>
    </v-card-text>
    <v-divider v-if="recipe.steps.length > 2" class="mx-4 my-3"></v-divider>
    <v-card-actions v-if="recipe.steps.length > 2">
      
      <v-btn
        color="blue"
        class="mx-auto"
        variant="text"
        @click="show = !show"
      >
        {{ !show ? 'Voir plus' : 'Voir moins' }}
        <v-tooltip
        activator="parent"
        location="end"
      >Voir le recette</v-tooltip>
      </v-btn>
      
      </v-card-actions>
      <v-divider class="mx-4 my-3"></v-divider>
      <v-card-actions>     
        <DialogIngredient :recipe="recipe"/>
      </v-card-actions>
  </v-card>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ref } from 'vue'
import DialogIngredient from "../components/DialogIngredient"
import { useUserStore } from '@/stores/user';
import { useRecipeStore } from '@/stores/recipe';

export default {
    name:"CardRecipe",
    components: {
        DialogIngredient
    },
    props: {
      recipe: {
        type: Object,
        required: true,
      }
    },
  
    setup (){
      const userStore = useUserStore();
      const store = useRecipeStore();

      const show = ref(false)
      const displayAnalyze = ref(false)
      const analyzeResponse = ref(null)
     
      const analyzeRecipe = async (recipe:any) => {
        displayAnalyze.value = true;
        analyzeResponse.value = await store.analyzeRecipe(recipe)
      }
      
      const deleteRecipe = (recipe: any) => {
        const res = store.deleteRecipe(recipe);
        if(res.status = 200){
          store.recipes.splice(recipe._id,1)
        }
        
      }
      return {
        show,
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
  cursor:pointer;
}
</style>