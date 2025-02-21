<script setup lang="ts">
import { onErrorCaptured, ref, computed } from "vue";
import { useRoute, RouterView } from "vue-router";
import { useAppState } from "@/composables/useAppState";
import Loader from "@/components/Loader.vue";
import Cover from "@/components/Cover.vue";
import { RouteNames } from "@/router";

const { pending } = useAppState();
const route = useRoute();
const error = ref<string | null>(null);

onErrorCaptured((err) => {
  error.value = err.message;
  return false;
});

const grayscaleCover = computed(() => RouteNames.SEARCH_GENRE_ID === route.name);
</script>

<template>
  <Cover :grayscale="grayscaleCover" />

  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition name="fade" mode="out-in">
        <Suspense>
          <!-- main content -->
          <Component :is="Component" />

          <!-- loading state -->
          <!-- <template #fallback> Loading... </template> -->
        </Suspense>
      </Transition>
    </template>
  </RouterView>

  <div v-if="error">Error: {{ error }}</div>

  <Loader
    class="z-10 fixed w-16 h-16 bottom-4 right-4 text-amber-400 opacity-0 invisible transition"
    :class="{
      'opacity-100 visible': pending,
    }"
  />
</template>
