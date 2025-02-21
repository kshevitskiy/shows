import { reactive, toRefs } from "vue";
import { createSharedComposable } from "@vueuse/core";

interface AppState {
  pending: boolean;
  cover: ImageDTO | null;
}

function _useAppState() {
  const state = reactive<AppState>({
    pending: false,
    cover: null,
  });

  const setPending = (value: boolean) => (state.pending = value);
  const setCover = (value: ImageDTO | null) => (state.cover = value);

  return {
    setCover,
    setPending,
    ...toRefs(state),
  };
}

export const useAppState = createSharedComposable(_useAppState);
