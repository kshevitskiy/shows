<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute, type RouteLocationRaw } from "vue-router";

interface MenuItem {
  id: number;
  label: string;
  to: RouteLocationRaw;
}

const props = defineProps<{ items: MenuItem[]; navOnFocus?: boolean }>();
const router = useRouter();
const route = useRoute();
const activeIndex = computed(() => props.items.findIndex((i) => i.id === +route.params.id));

function onFocus(menuItem: MenuItem) {
  if (!props.navOnFocus) return;

  router.push(menuItem.to);
}
</script>

<template>
  <nav class="inline-flex gap-1 xl:grid" role="navigation">
    <RouterLink
      v-for="(item, i) in items"
      :key="item.id"
      :to="item.to"
      :autofocus="i === activeIndex"
      class="truncate opacity-50 transition-opacity inline-flex items-center h-12 px-6 outline-none text-xl xl:text-3xl 2xl:text-4xl"
      active-class="font-bold text-amber-400 opacity-100"
      :aria-current="i === activeIndex ? 'page' : undefined"
      data-testid="menu-item"
      @focus="() => onFocus(item)"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>
