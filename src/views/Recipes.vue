
<template>

  <v-item-group selected-class="bg-primary">
    <v-container>
      <v-row>
        <v-col
          v-for="recipe in recipes"
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

<script>
  const recipes = [{
    name: "Recette 1",
    number_of_person: 4,
    user_id: 2,
    ingredients: [{
        name: "aliment 1",
        quantity: 2,
        protein_per_100: 10,
        carbohydrate_per_100: 8,
        lipid_per_100: 15,
        unity:"g"
        },
        {
        name: "aliment 2",
        quantity: 2,
        protein_per_100: 5,
        carbohydrate_per_100: 12,
        lipid_per_100: 17,
        unity:"cl"
        },
    ],
    steps: [{
        order: 1,
        description: "Cassez les oeufs."
    }, 
    {
        order: 2,
        description: "Ajoutez la crème, le sel et le poivre." 
    },
    {
        order: 3,
        description: "Enfournerà 180° pendant 20minutes."
    }
    ]

  },
  {
    name: "Recette 2",
    number_of_person: 3,
    user_id: 1,
    ingredients: [{
        name: "aliment 1",
        quantity: 2,
        protein_per_100: 10,
        carbohydrate_per_100: 8,
        lipid_per_100: 15,
        unity:"g"
        },
        {
        name: "aliment 2",
        quantity: 2,
        protein_per_100: 5,
        carbohydrate_per_100: 12,
        lipid_per_100: 17,
        unity:"cl"
        },
    ],
    steps: [{
        order: 1,
        description: "Cassez les oeufs."
    }, 
    {
        order: 2,
        description: "Ajoutez la crème, le sel et le poivre." 
    },
    {
        order: 3,
        description: "Enfournerà 180° pendant 20minutes."
    }
    ]

  },
  {
    name: "Recette 3",
    number_of_person: 2,
    user_id: 2,
    ingredients: [{
        name: "aliment 1",
        quantity: 2,
        protein_per_100: 10,
        carbohydrate_per_100: 8,
        lipid_per_100: 15,
        unity:"g"
        },
        {
        name: "aliment 2",
        quantity: 2,
        protein_per_100: 5,
        carbohydrate_per_100: 12,
        lipid_per_100: 17,
        unity:"cl"
        },
    ],
    steps: [{
        order: 1,
        description: "Cassez les oeufs."
    }, 
    {
        order: 2,
        description: "Ajoutez la crème, le sel et le poivre." 
    },
    {
        order: 3,
        description: "Enfournerà 180° pendant 20minutes."
    }
    ]

  },
  ]
  import CardRecipe from "../components/CardRecipe"
  export default {
    name: "Recipes",
    components: {
        CardRecipe
    },
    data: () => ({
      loading: false,
      recipes,
    }),

    methods: {
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
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
