<template>
   <form class="d-flex flex-column " @submit.prevent="onSubmit">
    <div class="text-subtitle-2 text-decoration-underline mx-auto my-3"> Modification de l'aliment {{this.ingredient.name}}</div>
    
    <v-text-field 
      v-model="name"
      label="Aliment"
    ></v-text-field>
    <v-text-field class="test"
      v-model="quantity"
      type="number"
      label="Quantité"
    ></v-text-field>
    <v-text-field class="test"
      type="number"
      v-model="protein_per_100"
      label="Protéines/100g"
    ></v-text-field>
    <v-text-field class="test"
      type="number"
      v-model="carbohydrate_per_100"
      label="Glucides/100g"
    ></v-text-field>
    <v-text-field class="test"
      type="number"
      v-model="lipid_per_100"
      label="Lipides/100g"
    ></v-text-field>
     <v-text-field class="test"
      v-model="unity"
      label="Unité"
    ></v-text-field>

     <v-btn
     color="green"
      type="submit"
      class="center"
      max-width="100"
    >
      Modifier
    </v-btn>

   </form>
    
</template>
<script lang="ts">
  import { ref } from 'vue'
  import { useRecipeStore } from '@/stores/recipe';

  export default {
    name:"FormIngredient",
    props: {
        ingredient:Object,
    },
    setup (i:any) {
        const store = useRecipeStore();
        
        const id = ref(i.ingredient._id);
        const name= ref(i.ingredient.name)
        const quantity= ref(i.ingredient.quantity)
        const protein_per_100= ref(i.ingredient.protein_per_100)
        const carbohydrate_per_100 = ref(i.ingredient.carbohydrate_per_100)
        const lipid_per_100 = ref(i.ingredient.lipid_per_100)
        const unity = ref(i.ingredient.unity)

        return {
            id,
            name,
            quantity,
            protein_per_100,
            carbohydrate_per_100,
            lipid_per_100,
            unity,
            onSubmit(){
                const ingredients = store.selectedRecipe.ingredients

                // console.log(ingredients, 'iii')
                const updatedIngredient = {
                    _id: id.value,
                    name: name.value,
                    quantity: parseInt(quantity.value),
                    protein_per_100: protein_per_100.value,
                    carbohydrate_per_100: carbohydrate_per_100.value,
                    lipid_per_100: lipid_per_100.value,
                    unity: unity.value
                }
                ingredients.splice(updatedIngredient._id, 1, updatedIngredient)
                // console.log(store.selectedRecipe)
                store.updateRecipe(store.selectedRecipe)
            }
        }
    },
    
  }
</script>

<style scoped>
    .test {
        max-width: 1502px;
        /* margin: auto; */
    }
    .center {
        margin: auto;
    }
</style>