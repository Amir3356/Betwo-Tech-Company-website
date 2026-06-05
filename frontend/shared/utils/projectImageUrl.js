export function resolveProjectImageUrl(image) {
  if (!image) {
    return "";
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  if (image.startsWith("/storage/")) {
    return image;
  }

  return image;
}
