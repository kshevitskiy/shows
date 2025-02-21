import { describe, expect, it } from "vitest";
import { getRandomBackgroundImage, getLargestBackgroundImage } from "../showImages";

describe("getRandomBackgroundImage", () => {
  it("returns a random background image", () => {
    const images = [
      { type: "background", url: "image1.jpg" },
      { type: "background", url: "image2.jpg" },
      { type: "other", url: "image3.jpg" },
    ];

    const result = getRandomBackgroundImage(images);

    expect(result).toBeDefined();
    expect(result.type).toBe("background");
    expect(["image1.jpg", "image2.jpg"]).toContain(result.url);
  });

  it("returns undefined if no background images exist", () => {
    const images = [
      { type: "other", url: "image1.jpg" },
      { type: "other", url: "image2.jpg" },
    ];

    const result = getRandomBackgroundImage(images);

    expect(result).toBeUndefined();
  });
});

describe("getLargestBackgroundImage", () => {
  it("returns the largest background image", () => {
    const images = [
      {
        type: "background",
        url: "image1.jpg",
        resolutions: { original: { width: 100, height: 200 } },
      },
      {
        type: "background",
        url: "image2.jpg",
        resolutions: { original: { width: 300, height: 400 } },
      },
      {
        type: "background",
        url: "image3.jpg",
        resolutions: { original: { width: 150, height: 200 } },
      },
      { type: "other", url: "image4.jpg" },
    ];

    const result = getLargestBackgroundImage(images);

    expect(result).toBeDefined();
    expect(result.url).toBe("image2.jpg");
  });

  it("returns undefined if no background images with original resolutions exist", () => {
    const images = [
      { type: "background", url: "image1.jpg" },
      { type: "background", url: "image2.jpg" },
    ];

    const result = getLargestBackgroundImage(images);

    expect(result).toBeUndefined();
  });

  it("handles empty array", () => {
    const images: any[] = [];

    const result = getLargestBackgroundImage(images);

    expect(result).toBeUndefined();
  });
});
