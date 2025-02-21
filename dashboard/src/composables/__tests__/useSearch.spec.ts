import { describe, it, expect, beforeEach } from "vitest";
import { useSearch } from "../useSearch";

describe("useSearch", () => {
  beforeEach(() => {
    useSearch().setQuery("");
  });

  it("initializes with default values", () => {
    const { query } = useSearch();
    expect(query.value).toBe("");
  });

  it("sets query correctly", () => {
    const { query, setQuery } = useSearch();

    setQuery("Breaking");
    expect(query.value).toBe("Breaking");

    setQuery("Bad");
    expect(query.value).toBe("Bad");

    setQuery("");
    expect(query.value).toBe("");
  });
});
