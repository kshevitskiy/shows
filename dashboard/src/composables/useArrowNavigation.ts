import { ref } from "vue";
import { useEventListener } from "@vueuse/core";

export function useArrowNavigation(items: any[]) {
  const index = ref(0);

  useEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
      index.value = (index.value - 1 + items.length) % items.length;
    } else if (event.key === "ArrowDown") {
      index.value = (index.value + 1) % items.length;
    } else if (event.key === "ArrowLeft") {
      index.value = Math.max(0, index.value - 1);
    } else if (event.key === "ArrowRight") {
      index.value = Math.min(items.length - 1, index.value + 1);
    }
  });

  return { index };
}
