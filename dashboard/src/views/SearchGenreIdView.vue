<script setup lang="ts">
import { computed, useTemplateRef, watchEffect, watch } from "vue";
import { useRoute } from "vue-router";
import { useSearch } from "@/composables/useSearch";
import { useShowSearch } from "@/composables/useShowSearch";
import ShowCard from "@/components/show/ShowCard.vue";
import DataList from "@/components/DataList.vue";

const route = useRoute();
const { query } = useSearch();
const { doSearch, doDebounceSearch, results, pending } = useShowSearch();
const triggerRef = useTemplateRef<HTMLElement>("triggerRef");

// initial
watchEffect(() => doSearch({ genreId: +route.params.id }));

// update
watch(
  () => query.value,
  () =>
    doDebounceSearch({
      query: query.value,
      genreId: +route.params.id,
    })
);
</script>

<template>
  <div v-if="pending" />
  <DataList
    v-else
    ref="triggerRef"
    :items="results"
    class="gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-16 2xl:gap-x-16 2xl:gap-y-20"
  >
    <template #item="{ item }">
      <ShowCard :show="item" />
    </template>
  </DataList>
</template>
