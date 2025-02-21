import { describe, it, expect, beforeEach } from "vitest";
import { useAppState } from "../useAppState";
import type { ImageDTO } from "@/types/api";

describe("useAppState", () => {
  beforeEach(() => {
    const { setPending, setCover } = useAppState();
    setPending(false);
    setCover(null);
  });

  it("initializes with default values", () => {
    const { pending, cover } = useAppState();
    expect(pending.value).toBe(false);
    expect(cover.value).toBeNull();
  });

  it("sets pending state correctly", () => {
    const { pending, setPending } = useAppState();

    setPending(true);
    expect(pending.value).toBe(true);

    setPending(false);
    expect(pending.value).toBe(false);
  });

  it("sets cover correctly", () => {
    const { cover, setCover } = useAppState();
    const imageMock = { id: 1, url: "https://example.com/image.jpg" };

    setCover(imageMock as unknown as ImageDTO);
    expect(cover.value).toEqual(imageMock);

    setCover(null);
    expect(cover.value).toBeNull();
  });
});
