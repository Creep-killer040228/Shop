import { createApp } from "vue";
import { createPinia } from "pinia";
import { router } from "./router/router";
import App from "./App.vue";
import "@/assets/style/main.scss";
import btnSortVue from "./components/ui/btnSort.vue";
const pinia = createPinia();
const app = createApp(App);
app.component("btnSortVue", btnSortVue)
app.use(pinia);
app.use(router);
app.mount("#app");