<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getShow, getShowImages } from "@/service/api";
import { useAppState } from "@/composables/useAppState";
import Base from "@/layouts/base.vue";
import Tag from "@/components/Tag.vue";
import Button from "@/components/Button.vue";
import IconButton from "@/components/IconButton.vue";
import Bar from "@/components/Bar.vue";
import DataSection from "@/components/DataSection.vue";
import DataPanel from "@/components/DataPanel.vue";
import ShowSeasons from "@/components/show/ShowSeasons.vue";
import { getLargestBackgroundImage } from "@/utils/showImages";
import type { ShowDTO } from "@/types/api";

const route = useRoute();
const router = useRouter();
const result = ref<ShowDTO>();
const appState = useAppState();

async function fetchData() {
  appState.setPending(true);

  try {
    const showId = +route.params.id;
    const { data } = await getShow(showId);
    result.value = data;

    if (!appState.cover.value) {
      const { data: images } = await getShowImages(showId);
      const image = getLargestBackgroundImage(images);
      appState.setCover(image ?? null);
    }
  } catch (exception) {
    throw exception;
  } finally {
    appState.setPending(false);
  }
}

await fetchData();
</script>

<template>
  <Base>
    <Bar class="justify-between">
      <IconButton label="Back" icon="hi-solid-chevron-left" as="button" @click="router.back" />
      <Button label="Watched" as="button" variant="primary" @click="router.back" />
    </Bar>

    <article v-if="result" class="relative grid gap-14">
      <header>
        <div class="xl:w-2/3">
          <Tag :label="result.rating.average ?? '0.0'" class="mb-6">
            <span>⭐️</span>
            <span data-testid="show-rating">
              {{ result.rating.average }}
            </span>
          </Tag>
          <h1 class="font-bold mb-8 text-5xl xl:text-7xl 2xl:text-9xl" data-testid="show-title">
            {{ result.name }}
          </h1>
        </div>
        <div class="xl:w-4/5">
          <div
            class="leading-relaxed text-amber-100 text-xl xl:text-2xl 2xl:text-3xl"
            v-html="result.summary"
            data-testid="show-description"
          />
          <div v-if="result.genres.length" class="flex flew-wrap gap-2 my-12">
            <Tag v-for="(t, i) in result.genres" :key="i" :label="t" />
          </div>
        </div>
      </header>

      <DataSection label="Seasons">
        <ShowSeasons :show-id="+route.params.id" />
      </DataSection>

      <DataSection label="Details">
        <div
          class="grid p-px gap-px border border-white/5 rounded-3xl lg:grid-cols-2 xl:grid-cols-3"
        >
          <DataPanel label="Type:" :value="result.type" />
          <DataPanel label="Status:" :value="result.status" />
          <DataPanel label="Language:" :value="result.language" />
          <DataPanel label="Premiered:" :value="result.premiered" />
          <DataPanel label="Ended:" :value="result.ended" />
          <DataPanel label="Site:" :value="result.officialSite">
            <template #value>
              <a :href="result.officialSite" target="_blank" class="underline">
                {{ result.name }}
              </a>
            </template>
          </DataPanel>
        </div>
      </DataSection>
    </article>
  </Base>
</template>
