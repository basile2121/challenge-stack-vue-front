import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: undefined as any,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post(
          "http://localhost:3003/api/auth/login",
          { email, password },
          { withCredentials: true }
        );
        this.user = response.data.user;
        // On stocke l'utilisateur dans le localStorage pour l'avoir partout dans notre application
        // Car le store ce supprime dès que l'application est rechargée
        localStorage.setItem("user", JSON.stringify(response.data.user));
      } catch (error) {
        //TODO Gérez les erreurs de connexion ici
        console.error('Erreur lors de la connexion : ' + error);
      }
    },
    async logout() {
      try {
        await axios.post("http://localhost:3003/api/auth/logout");
        this.user = undefined;
        localStorage.removeItem("user");

      } catch (error) {
        //TODO Gérez les erreurs de déconnexion ici
        console.error('Erreur lors de la deconnexion : ' + error);
      }
    },
    async register(
      email: string,
      password: string,
      firstName: string,
      lastName: string,
      date: string
    ) {
      try {
        const response = await axios.post(
          "http://localhost:3003/api/auth/register",
          { email, password, firstName, lastName, date }
        );
        this.user = response.data.user;
      } catch (error) {
        //TODO Gérez les erreurs d'inscription
        console.error('Erreur lors de l\'inscritpion : ' + error);
      }
    },
  },
});
