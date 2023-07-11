// userStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(email, password) {
      try {
        // Effectuez votre requête HTTP pour l'authentification
        const response = await axios.post('http://localhost:3003/api/auth/login', { email, password });

        // Stockez les informations utilisateur dans le store
        this.user = response.data.user;
      } catch (error) {
        // Gérez les erreurs de connexion ici
        console.error(error);
      }
    },
    async logout() {
      try {
        // Effectuez votre requête HTTP pour la déconnexion
        await axios.post('http://localhost:3003/api/auth/logout');

        // Réinitialisez les informations utilisateur dans le store
        this.user = null;


      } catch (error) {
        // Gérez les erreurs de déconnexion ici
        console.error(error);
      }
    },
    async register(email, password, firstName,lastName,date ) {
      try {
        // Effectuez votre requête HTTP pour l'inscription
        const response = await axios.post('http://localhost:3003/api/auth/register', { email, password, firstName,lastName,date });

        // Stockez les informations utilisateur dans le store
        this.user = response.data.user;
      } catch (error) {
        // Gérez les erreurs d'inscription ici
        console.error(error);
      }
    },
  },
});
