<script setup lang="ts">
import { ref } from "vue";
import { getShowSeasons } from "@/service/api";
import DataList from "@/components/DataList.vue";
import Image from "@/components/Image.vue";

const props = defineProps<{
  showId: number;
}>();

const results = ref<unknown[]>([]);

async function fetchData() {
  try {
    const { data } = await getShowSeasons(props.showId);
    results.value = data;
  } catch (exception) {
    throw exception;
  }
}

await fetchData();
</script>

<template>
  <DataList
    :items="results"
    class="grid-cols-5 gap-x-6 gap-y-10 xl:gap-x-12 xl:gap-y-16 2xl:gap-x-16 2xl:gap-y-20"
  >
    <template #item="{ item }">
      <figure class="mb-3">
        <Image
          :width="400"
          :height="600"
          :sizes="item?.image"
          class-name="w-full aspect-2/3 object-cover rounded-2xl p-px border border-white/5"
        />
      </figure>
      <h3 class="text-xl font-medium">{{ item.name || `Season ${item.number}` }}</h3>
    </template>
  </DataList>
</template>
