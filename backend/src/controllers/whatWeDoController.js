import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const whatWeDoFilePath = path.join(__dirname, "../data/whatWeDo.json");

const defaultContent = {
  title: "What We Do?",
  description: "We deliver custom software solutions that drive digital transformation and business growth.",
  services: [],
};

async function readWhatWeDo() {
  try {
    const raw = await fs.readFile(whatWeDoFilePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return defaultContent;
  }
}

async function writeWhatWeDo(content) {
  await fs.writeFile(whatWeDoFilePath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}

export async function getWhatWeDo(req, res) {
  try {
    const content = await readWhatWeDo();
    return res.json({ data: content });
  } catch (error) {
    console.error("Failed to load What We Do content:", error);
    return res.status(500).json({ message: "Failed to load What We Do content." });
  }
}

export async function updateWhatWeDo(req, res) {
  const { title, description, services } = req.body || {};

  try {
    const current = await readWhatWeDo();
    const nextContent = {
      title: typeof title === "string" ? title.trim() : current.title,
      description: typeof description === "string" ? description.trim() : current.description,
      services: Array.isArray(services) ? services : current.services,
    };

    await writeWhatWeDo(nextContent);
    return res.json({ message: "What We Do content updated.", data: nextContent });
  } catch (error) {
    console.error("Failed to update What We Do content:", error);
    return res.status(500).json({ message: "Failed to update What We Do content." });
  }
}

export async function addWhatWeDoService(req, res) {
  const { icon, title, description } = req.body || {};

  if (!icon || !title || !description) {
    return res.status(400).json({ message: "Icon, title, and description are required." });
  }

  try {
    const current = await readWhatWeDo();
    const services = Array.isArray(current.services) ? current.services : [];
    const nextContent = {
      ...current,
      services: [
        ...services,
        {
          icon,
          title: title.trim(),
          description: description.trim(),
        },
      ],
    };

    await writeWhatWeDo(nextContent);
    return res.status(201).json({ message: "Service added.", data: nextContent });
  } catch (error) {
    console.error("Failed to add What We Do service:", error);
    return res.status(500).json({ message: "Failed to add service." });
  }
}

export async function updateWhatWeDoService(req, res) {
  const { index } = req.params;
  const serviceIndex = Number(index);
  const { icon, title, description } = req.body || {};

  if (!Number.isInteger(serviceIndex) || serviceIndex < 0) {
    return res.status(400).json({ message: "Invalid service index." });
  }

  try {
    const current = await readWhatWeDo();
    const services = Array.isArray(current.services) ? [...current.services] : [];

    if (!services[serviceIndex]) {
      return res.status(404).json({ message: "Service not found." });
    }

    services[serviceIndex] = {
      icon: icon || services[serviceIndex].icon,
      title: typeof title === "string" ? title.trim() : services[serviceIndex].title,
      description: typeof description === "string" ? description.trim() : services[serviceIndex].description,
    };

    const nextContent = { ...current, services };
    await writeWhatWeDo(nextContent);
    return res.json({ message: "Service updated.", data: nextContent });
  } catch (error) {
    console.error("Failed to update What We Do service:", error);
    return res.status(500).json({ message: "Failed to update service." });
  }
}

export async function deleteWhatWeDoService(req, res) {
  const { index } = req.params;
  const serviceIndex = Number(index);

  if (!Number.isInteger(serviceIndex) || serviceIndex < 0) {
    return res.status(400).json({ message: "Invalid service index." });
  }

  try {
    const current = await readWhatWeDo();
    const services = Array.isArray(current.services) ? [...current.services] : [];

    if (!services[serviceIndex]) {
      return res.status(404).json({ message: "Service not found." });
    }

    services.splice(serviceIndex, 1);

    const nextContent = { ...current, services };
    await writeWhatWeDo(nextContent);
    return res.json({ message: "Service deleted.", data: nextContent });
  } catch (error) {
    console.error("Failed to delete What We Do service:", error);
    return res.status(500).json({ message: "Failed to delete service." });
  }
}