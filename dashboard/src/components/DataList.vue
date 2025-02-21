<script setup lang="ts" generic="T">
withDefaults(
  defineProps<{
    items: T[];
    label?: string;
  }>(),
  {
    label: "List",
  }
);
</script>

<template>
  <section class="w-full">
    <h2 class="sr-only">
      {{ label }}
    </h2>
    <Transition name="fade" mode="out-in">
      <ul v-if="items.length" v-bind="$attrs" class="grid">
        <li v-for="(item, index) in items" :key="index">
          <slot name="item" :item="item">
            <pre>
              {{ item }}
            </pre>
          </slot>
        </li>
      </ul>

      <div v-else>
        <slot name="nodata">
          <div class="py-20 px-8">
            <p class="text-2xl font-medium text-center">😢 Oops, nothing found this time..</p>
          </div>
        </slot>
      </div>
    </Transition>
  </section>
</template>
