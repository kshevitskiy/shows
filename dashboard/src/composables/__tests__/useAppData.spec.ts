import { describe, it, expect, beforeEach } from "vitest";
import { useAppData } from "../useAppData";

describe("useAppData", () => {
  beforeEach(() => {
    useAppData().setup({ genres: [] });
  });

  it("initializes genres when empty", () => {
    const { setup, genres } = useAppData();
    const initialData = { genres: [{ id: 1, name: "Action" }] };

    setup(initialData);

    expect(genres.value).toEqual(initialData.genres);
  });

  it("does not override genres if already set", () => {
    const { setup, genres } = useAppData();
    const firstData = { genres: [{ id: 1, name: "Action" }] };
    const secondData = { genres: [{ id: 2, name: "Drama" }] };

    setup(firstData);
    setup(secondData);

    expect(genres.value).toEqual(firstData.genres);
  });
});
