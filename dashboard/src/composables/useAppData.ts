import { ref, readonly } from "vue";
import { createSharedComposable } from "@vueuse/core";

interface AppData {
  genres: { id: number; name: string }[];
}

function _useAppData() {
  const genres = ref<GenreDTO[]>([]);

  const setup = (initialData: AppData) => {
    if (!genres.value.length) genres.value = initialData.genres;
  };

  return {
    setup,
    genres: readonly(genres),
  };
}

export const useAppData = createSharedComposable(_useAppData);
