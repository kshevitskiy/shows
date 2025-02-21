<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { useSearch } from "@/composables/useSearch";
import SearchLayout from "@/layouts/search.vue";
import Search from "@/components/Search.vue";
import Bar from "@/components/Bar.vue";

const route = useRoute();
const { query } = useSearch();
</script>

<template>
  <SearchLayout>
    <template #bar>
      <Bar class="justify-between">
        <Search v-model="query" />
      </Bar>
    </template>

    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <Transition name="fade" mode="out-in">
          <Component :key="route.params.id" :is="Component" />
        </Transition>
      </template>
    </RouterView>
  </SearchLayout>
</template>
