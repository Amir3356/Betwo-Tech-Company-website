const modules = import.meta.glob("./*.{png,jpg,jpeg,svg,gif,webp}", { eager: true });

const urlMap = {};
for (const [path, mod] of Object.entries(modules)) {
  const name = path.replace("./", "");
  urlMap[name] = mod.default;
}

export function getAssetUrl(filename) {
  return urlMap[filename] || null;
}
