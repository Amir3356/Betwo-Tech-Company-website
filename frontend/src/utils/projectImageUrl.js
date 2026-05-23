export function resolveProjectImageUrl(image) {
  if (!image) {
    return "";
  }

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  if (image.startsWith("/storage/")) {
    const configuredBackendUrl = import.meta.env.VITE_BACKEND_URL;

    if (configuredBackendUrl) {
      return `${configuredBackendUrl.replace(/\/$/, "")}${image}`;
    }

    if (typeof window !== "undefined") {
      const isViteDevHost = /:(5173|4173)$/.test(window.location.origin);
      if (isViteDevHost) {
        return `${window.location.origin.replace(/:(5173|4173)$/, ":8000")}${image}`;
      }

      return `${window.location.origin}${image}`;
    }
  }

  return image;
}