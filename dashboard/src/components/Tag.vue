<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <span
    class="inline-flex items-center py-2.5 px-4 rounded-full backdrop-blur border border-white/5 bg-gray-950/10 group-focus:bg-gray-950/20"
  >
    <span class="font-bold text-lg xl:text-2xl">
      <slot>
        {{ label }}
      </slot>
    </span>
  </span>
</template>
