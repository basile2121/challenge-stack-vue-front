import { Console } from "console";
import { defineStore } from "pinia";
import axios from "axios";

export const useRecipeStore = defineStore("recipe", {
  state: () => ({
    recipes: [],
    recipeUpdated: null,
    selectedRecipe: {},
  }),
  getters: {},
  actions: {
    async getAllRecipes() {
      try {
        const response = await axios.get("http://localhost:3003/api/recipes");
        this.recipes = response.data.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des recettes :", error);
      }
    },
    async updateRecipe(recipe: any) {
      try {
        const response = await axios.put(
          `http://localhost:3003/api/recipes/${recipe._id}`,
          recipe,
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette :", error);
        return error;
      }
    },
  },
});

const allRecipes = [
  {
    id: 1,
    name: "Recette 1",
    number_of_person: 4,
    user_id: 2,
    ingredients: [
      {
        id: 1,
        name: "aliment 1",
        quantity: 2,
        protein_per_100: 10,
        carbohydrate_per_100: 8,
        lipid_per_100: 15,
        unity: "g",
      },
      {
        id: 2,
        name: "aliment 2",
        quantity: 2,
        protein_per_100: 5,
        carbohydrate_per_100: 12,
        lipid_per_100: 17,
        unity: "cl",
      },
    ],
    steps: [
      {
        id: 1,
        order: 1,
        description: "Cassez les oeufs.",
      },
      {
        id: 2,
        order: 2,
        description: "Ajoutez la crème, le sel et le poivre.",
      },
      {
        id: 3,
        order: 3,
        description: "Enfournerà 180° pendant 20minutes.",
      },
    ],
  },
  {
    id: 2,
    name: "Recette 2",
    number_of_person: 3,
    user_id: 1,
    ingredients: [
      {
        id: 1,
        name: "aliment 1",
        quantity: 2,
        protein_per_100: 10,
        carbohydrate_per_100: 8,
        lipid_per_100: 15,
        unity: "g",
      },
      {
        id: 2,
        name: "aliment 2",
        quantity: 2,
        protein_per_100: 5,
        carbohydrate_per_100: 12,
        lipid_per_100: 17,
        unity: "cl",
      },
    ],
    steps: [
      {
        id: 1,
        order: 1,
        description: "Cassez les oeufs.",
      },
      {
        id: 2,
        order: 2,
        description: "Ajoutez la crème, le sel et le poivre.",
      },
      {
        id: 3,
        order: 3,
        description: "Enfournerà 180° pendant 20minutes.",
      },
    ],
  },
  {
    id: 3,
    name: "Recette 3",
    number_of_person: 2,
    user_id: 2,
    ingredients: [
      {
        id: 1,
        name: "aliment 1",
        quantity: 2,
        protein_per_100: 10,
        carbohydrate_per_100: 8,
        lipid_per_100: 15,
        unity: "g",
      },
      {
        id: 2,
        name: "aliment 2",
        quantity: 2,
        protein_per_100: 5,
        carbohydrate_per_100: 12,
        lipid_per_100: 17,
        unity: "cl",
      },
    ],
    steps: [
      {
        id: 1,
        order: 1,
        description: "Cassez les oeufs.",
      },
      {
        id: 2,
        order: 2,
        description: "Ajoutez la crème, le sel et le poivre.",
      },
      {
        id: 3,
        order: 3,
        description: "Enfournerà 180° pendant 20minutes.",
      },
    ],
  },
];
