export function resolveProjectImageUrl(image) {
  if (!image) {
    return "";
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  if (image.startsWith("/storage/")) {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    return `${apiBaseUrl}${image}`;
  }

  return image;
}
