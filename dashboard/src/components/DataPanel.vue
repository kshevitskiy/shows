<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();
</script>

<template>
  <div class="p-px outline-none rounded-2xl focus:ring-2 focus:ring-white/10" tabindex="0">
    <div class="flex items-center justify-center px-7 h-24 backdrop-blur rounded-2xl">
      <span class="inline-flex gap-2 text-xl">
        <slot name="label">
          <span class="font-mono font-medium">
            {{ label }}
          </span>
        </slot>
        <slot name="value">
          <span class="text-amber-100">
            {{ value }}
          </span>
        </slot>
      </span>
    </div>
  </div>
</template>
