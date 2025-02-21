<script setup lang="ts">
const value = defineModel();
</script>

<template>
  <input
    v-model="value"
    type="search"
    placeholder="Search..."
    class="w-full max-w-xl h-16 px-7 rounded-full backdrop-blur outline-none transition bg-gray-950/20 border border-white/5 ring-white/10 focus:ring-2 text-lg xl:text-xl"
  />
</template>
