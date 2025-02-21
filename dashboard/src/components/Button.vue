<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

interface Props {
  label?: string;
  as?: "button" | "router-link";
  to?: RouteLocationRaw;
  variant?: "default" | "primary";
}

withDefaults(defineProps<Props>(), {
  label: "",
  as: "router-link",
  to: "",
  variant: "default",
});

const variants = {
  default: "bg-gray-950/10 border-white/5 text-gray-200 ring-white/10 hover:text-gray-100",
  primary: "bg-amber-950/10 border-white/5 text-amber-400 ring-amber-400/10 hover:text-amber-200",
};
</script>

<template>
  <Component
    :is="as"
    :to="to"
    class="h-16 px-6 flex items-center rounded-full backdrop-blur-sm cursor-pointer outline-none border font-medium text-lg focus:ring xl:text-2xl"
    :class="variants[variant]"
    :title="label"
  >
    <slot>
      {{ label }}
    </slot>
  </Component>
</template>
