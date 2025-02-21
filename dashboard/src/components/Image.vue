<script setup lang="ts">
import { computed } from "vue";

interface Sizes {
  medium?: string;
  original?: string;
}

interface Props {
  width: number;
  height: number;
  sizes?: Sizes;
  alt?: string;
  loading?: "lazy" | "eager";
  className?: string;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "Image",
  loading: "lazy",
  className: "",
});

const defaultPlaceholder = `https://placehold.co/400x600/000000/FFF?text=${props.alt}`;

const fallbackSrc = computed(() => props.sizes?.original || defaultPlaceholder);
</script>

<template>
  <picture>
    <source v-if="sizes?.medium" :srcset="sizes.medium" media="(max-width: 768px)" />
    <img
      :width="width"
      :height="height"
      :src="fallbackSrc"
      :alt="alt"
      :loading="loading"
      class="backdrop-blur"
      :class="className"
    />
  </picture>
</template>
