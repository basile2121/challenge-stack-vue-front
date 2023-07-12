import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipe', {
  state: () => ({
    recipe: 5,
  }),
  getters: {
    doubleCount: (state) => state.recipe * 2,
  },
  actions: {
    increment() {
      this.recipe++;
    },
  },
});
