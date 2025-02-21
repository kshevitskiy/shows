<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";

interface Props {
  label?: string;
  as?: "button" | "router-link";
  to?: RouteLocationRaw;
  variant?: "default" | "primary";
  icon: string;
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
    class="w-16 h-16 flex items-center justify-center rounded-full backdrop-blur-sm cursor-pointer outline-none border font-medium text-lg focus:ring xl:text-2xl"
    :class="variants[variant]"
    :title="label"
  >
    <slot>
      <Icon :name="icon" class="w-8 h-8" />
    </slot>
  </Component>
</template>
