import { getAllServices, createService, findServiceById, updateService as updateServiceModel, deleteServiceById } from "../models/services.model.js";

function parsePoints(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return [];
}

export async function getServices(req, res) {
  try {
    const services = await getAllServices();
    return res.json({ data: services });
  } catch (error) {
    console.error("Failed to load services:", error);
    return res.status(500).json({ message: "Failed to load services." });
  }
}

export async function addService(req, res) {
  const { title, description, points, icon } = req.body || {};
  let image = null;

  if (req.file) {
    image = `/storage/services/${req.file.filename}`;
  }

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  try {
    const service = await createService({
      icon: icon || "Code",
      title: title.trim(),
      description: description.trim(),
      points: JSON.stringify(parsePoints(points)),
      image,
    });

    return res.status(201).json({ message: "Service added.", data: service });
  } catch (error) {
    console.error("Failed to add service:", error);
    return res.status(500).json({ message: "Failed to add service." });
  }
}

export async function updateService(req, res) {
  const { id } = req.params;
  const { title, description, points, icon } = req.body || {};

  try {
    const existing = await findServiceById(id);
    if (!existing) {
      return res.status(404).json({ message: "Service not found." });
    }

    const image = req.file ? `/storage/services/${req.file.filename}` : existing.image;

    const service = await updateServiceModel(id, {
      icon: icon || existing.icon,
      title: typeof title === "string" ? title.trim() : existing.title,
      description: typeof description === "string" ? description.trim() : existing.description,
      points: JSON.stringify(parsePoints(points ?? existing.points)),
      image,
    });

    return res.json({ message: "Service updated.", data: service });
  } catch (error) {
    console.error("Failed to update service:", error);
    return res.status(500).json({ message: "Failed to update service." });
  }
}

export async function deleteService(req, res) {
  const { id } = req.params;

  try {
    const deleted = await deleteServiceById(id);

    if (!deleted) {
      return res.status(404).json({ message: "Service not found." });
    }

    const remaining = await getAllServices();
    return res.json({ message: "Service deleted.", data: remaining });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return res.status(500).json({ message: "Failed to delete service." });
  }
}
