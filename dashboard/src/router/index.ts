import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import SearchIndexView from "@/views/SearchIndexView.vue";

export enum RouteNames {
  HOME = "home",
  SEARCH_INDEX = "search_index",
  SEARCH_GENRE_ID = "search_genre_id",
  SHOW_ID = "show_id",
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: RouteNames.HOME,
      component: HomeView,
      children: [
        {
          path: "",
          name: RouteNames.SEARCH_INDEX,
          component: SearchIndexView,
        },
        {
          path: "/search/genre/:id",
          name: RouteNames.SEARCH_GENRE_ID,
          component: () => import("../views/SearchGenreIdView.vue"),
        },
      ],
    },
    {
      path: "/show/:id",
      name: RouteNames.SHOW_ID,
      component: () => import("../views/ShowView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // if navigating back, restore previous scroll position
    if (savedPosition) {
      return savedPosition;
    }
    // otherwise, scroll to top
    return { top: 0, behavior: "smooth" }; // Smooth scrolling
  },
});

export default router;
