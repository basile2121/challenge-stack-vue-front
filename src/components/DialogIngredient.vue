<template>
<v-btn 
        color="green"
        class="mx-auto mb-3"
        variant="outlined-text"
        @click="dialog = true"
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
      width="50%"
      class="px-10"
    >

      <v-card>
        <v-card-text v-for="ingredient in recipe"
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
<script>
  import FormIngredient from "../components/FormIngredient"
  export default {
    name: "DialogIngredient",
    components: {
        FormIngredient
    },
    props: {
        recipe:Object,
    },
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>