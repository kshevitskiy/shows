<script setup lang="ts">
import { RouterLink } from "vue-router";
import { RouteNames } from "@/router";
import { useAppState } from "@/composables/useAppState";
import { getShowImages } from "@/service/api";
import { getLargestBackgroundImage } from "@/utils/showImages";
import Image from "@/components/Image.vue";
import Tag from "@/components/Tag.vue";
import type { ShowDTO } from "@/types/api";

const props = withDefaults(
  defineProps<{
    show: ShowDTO;
    as?: "div" | "li" | "section";
  }>(),
  {
    as: "div",
  }
);

const { setCover } = useAppState();

async function onFocus() {
  try {
    const { data: images } = await getShowImages(props.show.id);
    const image = getLargestBackgroundImage(images);
    setCover(image ?? null);
  } catch (exception) {
    throw exception;
  }
}
</script>

<template>
  <Component :is="as" data-testid="show-card">
    <RouterLink
      :to="{ name: RouteNames.SHOW_ID, params: { id: show.id } }"
      class="group grid gap-1 outline-none transition-transform duration-500 focus:scale-105"
      @focus="onFocus"
    >
      <div class="relative">
        <Image
          :width="400"
          :height="600"
          :sizes="{ medium: show.image.medium, original: show.image.original }"
          :alt="show.name"
          class-name="w-full aspect-2/3 object-cover rounded-2xl ring-white/10 group-focus:ring-4 pointer-events-none"
        />
        <Tag
          v-if="show.rating.average"
          :label="show.rating.average ?? '0.0'"
          class="absolute top-2 right-2"
        >
          <span>⭐️</span>
          <span data-testid="show-rating">{{ show.rating.average }}</span>
        </Tag>
      </div>
      <header>
        <h3 class="text-xl font-medium group-focus:text-amber-400" data-testid="show-name">
          {{ show.name }}
        </h3>
      </header>
    </RouterLink>
  </Component>
</template>
