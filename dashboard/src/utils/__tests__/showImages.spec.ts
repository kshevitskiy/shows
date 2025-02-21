import { describe, expect, it } from "vitest";
import { getRandomBackgroundImage, getLargestBackgroundImage } from "../showImages";
import type { ImageDTO } from "@/types/api";

describe("getRandomBackgroundImage", () => {
  it("returns a random background image", () => {
    const images = [
      { type: "background", resolutions: { original: { url: "image1.jpg" } } },
      { type: "background", resolutions: { original: { url: "image2.jpg" } } },
      { type: "other", resolutions: { original: { url: "image3.jpg" } } },
    ];

    const result = getRandomBackgroundImage(images as unknown as ImageDTO[]);

    expect(result).toBeDefined();
    expect(result.type).toBe("background");
    expect(["image1.jpg", "image2.jpg"]).toContain(result.resolutions.original.url);
  });

  it("returns undefined if no background images exist", () => {
    const images = [
      { type: "other", url: "image1.jpg" },
      { type: "other", url: "image2.jpg" },
    ];

    const result = getRandomBackgroundImage(images as unknown as ImageDTO[]);

    expect(result).toBeUndefined();
  });
});

describe("getLargestBackgroundImage", () => {
  it("returns the largest background image", () => {
    const images = [
      {
        type: "background",
        resolutions: { original: { url: "image1.jpg", width: 100, height: 200 } },
      },
      {
        type: "background",
        resolutions: { original: { url: "image2.jpg", width: 300, height: 400 } },
      },
      {
        type: "background",
        resolutions: { original: { url: "image3.jpg", width: 150, height: 200 } },
      },
      { type: "other" },
    ];

    const result = getLargestBackgroundImage(images as unknown as ImageDTO[]);

    expect(result).toBeDefined();
    expect(result?.resolutions.original.url).toBe("image2.jpg");
  });

  it("returns undefined if no background images with original resolutions exist", () => {
    const images = [
      { type: "background", url: "image1.jpg" },
      { type: "background", url: "image2.jpg" },
    ];

    const result = getLargestBackgroundImage(images as unknown as ImageDTO[]);

    expect(result).toBeUndefined();
  });

  it("handles empty array", () => {
    const images: any[] = [];

    const result = getLargestBackgroundImage(images as unknown as ImageDTO[]);

    expect(result).toBeUndefined();
  });
});
