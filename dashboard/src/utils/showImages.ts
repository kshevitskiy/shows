export function getRandomBackgroundImage(images: ImageDTO[]) {
  const backgrounds = images.filter((i) => i.type === "background");
  return backgrounds[~~(Math.random() * backgrounds.length)];
}

export function getLargestBackgroundImage(images: ImageDTO[]) {
  return images
    .filter((i) => i.type === "background" && i.resolutions.original)
    .reduce((largest, current) =>
      current.resolutions.original.width * current.resolutions.original.height >
      largest.resolutions.original.width * largest.resolutions.original.height
        ? current
        : largest
    );
}
