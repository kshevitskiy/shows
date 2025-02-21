<script setup lang="ts">
import { computed } from "vue";
import { useAppState } from "@/composables/useAppState";
import Image from "@/components/Image.vue";

withDefaults(
  defineProps<{
    grayscale?: boolean;
  }>(),
  {
    grayscale: false,
  }
);

const { cover } = useAppState();
const medium = computed(() => cover.value?.resolutions.original);
const original = computed(() => cover.value?.resolutions.original);
</script>

<template>
  <div class="z-[-1] fixed top-0 left-0">
    <div class="fixed top-0 left-0 animate-scale" :class="{ grayscale }">
      <Image
        v-if="original?.url"
        :width="original?.width ?? 1920"
        :height="original?.height ?? 1080"
        :sizes="{
          medium: medium?.url,
          original: original?.url,
        }"
        alt="cover"
        class-name="w-screen h-screen object-cover"
      />
    </div>
    <div
      class="fixed top-0 left-0 w-full h-full transition-colors duration-500 bg-gray-950/70"
      :class="{ 'bg-gray-950/90': grayscale }"
    />
    <div
      v-for="index in 4"
      :key="index"
      class="fixed bottom-0 left-0 w-full bg-gradient-to-t to-transparent"
      :class="{
        'h-4/5 from-gray-950/70': index === 4,
        'h-3/5 from-gray-950/80': index === 3,
        'h-2/5 from-gray-950/90': index === 2,
        'h-1/5 from-gray-950/100': index === 1,
      }"
    />
  </div>
</template>
