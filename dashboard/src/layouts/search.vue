<script setup lang="ts">
import Base from "@/layouts/base.vue";
import Navigation from "@/components/Navigation.vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import Bar from "@/components/Bar.vue";
</script>

<template>
  <Base>
    <div class="grid items-start gap-12 xl:flex">
      <Sidebar class="xl:min-w-xs">
        <Bar>
          <Navbar />
        </Bar>
        <Navigation data-testid="navigation" />
      </Sidebar>

      <main class="min-h-screen xl:w-9/12">
        <slot name="bar" />

        <slot />
      </main>
    </div>
  </Base>
</template>
