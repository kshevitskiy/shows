<script setup lang="ts">
import { RouteNames } from "@/router";
import Menu from "@/components/Menu.vue";
import { useAppData } from "@/composables/useAppData";

const appData = useAppData();

const genresNavigation = appData.genres.value.map((i) => ({
  ...i,
  label: i.name,
  to: { name: RouteNames.SEARCH_GENRE_ID, params: { id: i.id } },
}));
</script>

<template>
  <Menu :items="genresNavigation" aria-label="Genres Menu" nav-on-focus />
</template>
