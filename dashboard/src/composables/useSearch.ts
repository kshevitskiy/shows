import { reactive, toRefs } from "vue";
import { createSharedComposable } from "@vueuse/core";

interface SearchState {
  query: string;
}

function _useSearch() {
  const state = reactive<SearchState>({
    query: "",
  });

  const setQuery = (value: string) => (state.query = value);

  return {
    setQuery,
    ...toRefs(state),
  };
}

export const useSearch = createSharedComposable(_useSearch);
