<script setup lang="ts">
import { watch } from "vue";
import { useSearch } from "@/composables/useSearch";
import { useShowSearch } from "@/composables/useShowSearch";
import DataList from "@/components/DataList.vue";
import ShowCard from "@/components/show/ShowCard.vue";

const { query } = useSearch();
const { doSearch, doDebounceSearch, results, pending } = useShowSearch();

// initial
await doSearch();

// update
watch(
  () => query.value,
  () => doDebounceSearch({ query: query.value })
);
</script>

<template>
  <div v-if="pending" />
  <DataList
    v-else
    :items="results"
    class="gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-16 2xl:gap-x-16 2xl:gap-y-20"
  >
    <template #item="{ item }">
      <ShowCard :show="item" />
    </template>
  </DataList>
</template>
