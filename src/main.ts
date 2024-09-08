import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import i18n from './i18n'

//import anime from "animejs/lib/anime.es.js";

export const pinia = createPinia();

createApp(App).use(pinia).use(i18n).mount("#app");
