<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string;
    backdrop?: boolean;
  }>(),
  {
    backdrop: false,
  }
);
</script>

<template>
  <section class="grid gap-3">
    <h2 class="font-bold text-xl xl:text-3xl 2xl:text-4xl">{{ label }}</h2>

    <div
      :class="{
        'p-8 rounded-3xl backdrop-blur border border-white/5': backdrop,
      }"
    >
      <slot />
    </div>
  </section>
</template>
