// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () =>
          import("@/views/Home.vue"),
      },
      {
        path: "recipes",
        name: "Recipes",
        component: () =>
          import("@/views/Recipes.vue"),
      },
      {
        path: "login",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "register",
        component: () => import("@/views/register.vue"),
      },
    ],
  },

  {
    // On redirige toutes les routes non définis sur cette page
    path: "/:catchAll(.*)*",
    component: () => import("@/views/ErrorNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
