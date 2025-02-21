import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { getGenres } from "./service/api";
import { useAppData } from "./composables/useAppData";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { HiSolidChevronLeft, HiHome } from "oh-vue-icons/icons";

addIcons(HiSolidChevronLeft, HiHome);

async function bootstrap() {
  // pre-fetch app data
  const genres = await getGenres();
  useAppData().setup({ genres: genres.data });

  // create app
  const app = createApp(App);

  app.component("Icon", OhVueIcon);
  app.use(router);
  app.mount("#app");
}

bootstrap();
