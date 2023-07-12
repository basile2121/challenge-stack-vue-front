/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

// Composables
import { createApp, watch } from "vue";
const pinia = createPinia();

// Plugins
import { registerPlugins } from "@/plugins";

const app = createApp(App);

registerPlugins(app);

app.use(createPinia()).use(router).mount("#app");

// main.js or main.ts
