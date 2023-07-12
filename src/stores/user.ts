// userStore.js
import { defineStore } from 'pinia';
import axios from 'axios';


export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as any,
  }),
  actions: {
    async login(email:string, password:string) {
      try {
        // Effectuez votre requête HTTP pour l'authentification
        const response = await axios.post('http://localhost:3003/api/auth/login', { email, password }, { withCredentials: true });

        // Stockez les informations utilisateur dans le store
        this.user = response.data.user;
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } catch (error) {
        // Gérez les erreurs de connexion ici
        console.log(error)
        console.error(error);
      }
    },
    async logout() {
      try {
        // Effectuez votre requête HTTP pour la déconnexion
        await axios.post('http://localhost:3003/api/auth/logout');

        // Réinitialisez les informations utilisateur dans le store
        this.user = undefined;
        localStorage.removeItem('user');


      } catch (error) {
        // Gérez les erreurs de déconnexion ici
        console.error(error);
      }
    },
    async register(email :string, password:string, firstName:string,lastName:string,date:string ) {
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
