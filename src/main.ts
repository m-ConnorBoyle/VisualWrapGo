import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import messages from "/src/locales/en.json";

export const pinia = createPinia();
const i18n = createI18n({
    locale: "en",
    messages: { en : messages },
    legacy: false
});

createApp(App).use(pinia).use(i18n).mount("#app");
