import {defineStore} from "pinia";
import axios from "axios";
const API_URL = 'http://localhost:3003'

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
        const response = await axios.get(API_URL + "/api/recipes");
        this.recipes = response.data.data;
      } catch (error) {
        //TODO Gérez les erreurs ici
        console.error("Erreur lors de la récupération des recettes : ", error);
      }
    },
    async updateRecipe(recipe: any) {
      try {
        const response = await axios.put(
          API_URL + `/api/recipes/${recipe._id}`,
          recipe,
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette : ", error);
        return error;
      }
    },

    async deleteRecipe(recipe: any) {
      try {
        return await axios.delete(
          API_URL + `/api/recipes/${recipe._id}`,
          {withCredentials: true}
        );
      } catch (error) {
        console.error("Erreur lors de la mise à jour de la recette : ", error);
        return error;
      }
    },
    async createRecipe(recipe: any) {
      try {
        const response = await axios.post(
          API_URL + `/api/recipes/`,
          recipe,
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Erreur lors de l'analyse de la recette : ", error);
        return error;
      }
    },
    async createRandomRecipe() {
      try {
        const response = await axios.get(
          "API_URL + /api/recipes/random/create/",
          { withCredentials: true }
        );

        return response.data.data;
      } catch (error) {
        console.error("Erreur lors de l'analyse de la recette : ", error);
        return error;
      }
    },
    // Analyse une recette avec l'id d'une recette, il faut qu'elle soit enregistré en BDD
    async analyzeRecipe(recipe: any) {
      try {
        const response = await axios.get(
          API_URL + `/api/recipes/analyze/${recipe._id}`,
          { withCredentials: true }
        );

        return response.data.data;
      } catch (error) {
        console.error("Erreur lors de l'analyse de la recette : ", error);
        return error;
      }
    },
    // Analyse une recette pas encore enregistrée en BDD. On passe donc l'objet de la recette directement à l'API
    async analyzeRecipeObject(recipeObject: any) {
      try {
        const response = await axios.post(
          API_URL + "/api/recipes/single/analyze/",
          recipeObject,
          { withCredentials: true }
        );
        return response.data.data;
      } catch (error) {
        console.error("Erreur lors de l'analyse de la recette : ", error);
        return error;
      }
    },
  },
});
