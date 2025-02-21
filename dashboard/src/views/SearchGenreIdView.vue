<script setup lang="ts">
import { computed, useTemplateRef, watchEffect } from "vue";
import { useRoute } from "vue-router";
// import { useInfiniteScroll } from "@vueuse/core";
import { useSearch } from "@/composables/useSearch";
import { useShowSearch } from "@/composables/useShowSearch";
import ShowCard from "@/components/show/ShowCard.vue";
import DataList from "@/components/DataList.vue";

const route = useRoute();
const { query } = useSearch();
const { doDebounceSearch, results } = useShowSearch();
const params = computed(() => ({
  genreId: +route.params.id,
  query: query.value,
}));
const triggerRef = useTemplateRef<HTMLElement>("triggerRef");

watchEffect(() => doDebounceSearch(params.value));
</script>

<template>
  <DataList
    ref="triggerRef"
    :items="results"
    class="grid-cols-3 gap-x-6 gap-y-10 xl:gap-x-12 xl:gap-y-16 2xl:gap-x-16 2xl:gap-y-20"
  >
    <template #item="{ item }">
      <ShowCard :show="item" />
    </template>
  </DataList>
</template>
