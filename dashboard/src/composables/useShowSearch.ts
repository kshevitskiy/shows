import { ref } from "vue";
import debounce from "lodash.debounce";
import { getShows, type GetShowsParams } from "@/service/api";
import { useAppState } from "@/composables/useAppState";

export const useShowSearch = () => {
  const results = ref<ShowDTO[]>([]);
  const pagination = ref<PaginaitonDTO>();
  const { setPending } = useAppState();

  const doSearch = async (params?: GetShowsParams) => {
    setPending(true);

    try {
      const { data: res } = await getShows(params);

      results.value = res.data;
      pagination.value = res.meta;
    } catch (exception) {
      throw exception;
    } finally {
      setPending(false);
    }
  };

  const doDebounceSearch = debounce(async (params: GetShowsParams) => await doSearch(params), 300);

  return {
    doSearch,
    doDebounceSearch,
    results,
    pagination,
  };
};
