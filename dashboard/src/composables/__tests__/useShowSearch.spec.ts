import { describe, it, expect, beforeEach, vi } from "vitest";
import { useShowSearch } from "../useShowSearch";
import * as api from "@/service/api";

vi.mock("@/service/api", () => ({
  getShows: vi.fn(),
}));

vi.mock("@/composables/useAppState", () => ({
  useAppState: () => ({
    setPending: vi.fn(),
  }),
}));

describe("useShowSearch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with empty results and undefined pagination", () => {
    const { results, pagination } = useShowSearch();

    expect(results.value).toEqual([]);
    expect(pagination.value).toBeUndefined();
  });

  it("calls getShows and updates results and pagination", async () => {
    const { doSearch, results, pagination } = useShowSearch();
    const mockResponse = {
      data: [{ id: 1, name: "Breaking Bad" }],
      meta: { page: 1, pageSize: 10 },
    };

    (api.getShows as ReturnType<typeof vi.fn>).mockResolvedValue({ data: mockResponse });

    await doSearch({ page: 1 });

    expect(api.getShows).toHaveBeenCalledWith({ page: 1 });
    expect(results.value).toEqual(mockResponse.data);
    expect(pagination.value).toEqual(mockResponse.meta);
  });

  it("handles API errors gracefully", async () => {
    const { doSearch } = useShowSearch();
    const errorMock = new Error("API exception");
    (api.getShows as ReturnType<typeof vi.fn>).mockRejectedValueOnce(errorMock);

    await expect(doSearch()).rejects.toThrow(errorMock);
  });

  it("debounces search calls", async () => {
    const { doDebounceSearch } = useShowSearch();
    const mockParams = { page: 1 };

    vi.useFakeTimers();
    doDebounceSearch(mockParams);

    expect(api.getShows).not.toHaveBeenCalled();

    vi.advanceTimersByTime(300);
    expect(api.getShows).toHaveBeenCalledWith(mockParams);

    vi.useRealTimers();
  });
});
