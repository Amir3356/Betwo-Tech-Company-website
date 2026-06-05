import {
  getAllTechStack,
  createTechStack,
  findTechStackById,
  updateTechStack,
  deleteTechStackById,
} from "../models/techStack.model.js";

export async function getTechStack(req, res) {
  try {
    const items = await getAllTechStack();
    return res.json({ data: items });
  } catch (error) {
    console.error("Failed to fetch tech stack:", error);
    return res.status(500).json({ message: "Failed to load tech stack." });
  }
}

export async function getTechStackById(req, res) {
  const { id } = req.params;

  try {
    const item = await findTechStackById(id);
    if (!item) {
      return res.status(404).json({ message: "Technology not found." });
    }
    return res.json({ data: item });
  } catch (error) {
    console.error("Failed to fetch technology:", error);
    return res.status(500).json({ message: "Failed to load technology." });
  }
}

export async function createTechStackHandler(req, res) {
  const { icon, name, category, description } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required." });
  }

  try {
    const item = await createTechStack({
      icon: icon || "Code",
      name: name.trim(),
      category: (category || "Other").trim(),
      description: description || "",
    });

    return res.status(201).json({ message: "Technology created.", data: item });
  } catch (error) {
    console.error("Failed to create technology:", error);
    return res.status(500).json({ message: "Failed to create technology." });
  }
}

export async function updateTechStackHandler(req, res) {
  const { id } = req.params;
  const { icon, name, category, description } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required." });
  }

  try {
    const existing = await findTechStackById(id);
    if (!existing) {
      return res.status(404).json({ message: "Technology not found." });
    }

    const item = await updateTechStack(id, {
      icon: icon || existing.icon || "Code",
      name: name.trim(),
      category: (category || "Other").trim(),
      description: description || "",
    });

    return res.json({ message: "Technology updated.", data: item });
  } catch (error) {
    console.error("Failed to update technology:", error);
    return res.status(500).json({ message: "Failed to update technology." });
  }
}

export async function deleteTechStackHandler(req, res) {
  const { id } = req.params;

  try {
    const existing = await findTechStackById(id);
    if (!existing) {
      return res.status(404).json({ message: "Technology not found." });
    }

    await deleteTechStackById(id);
    return res.json({ message: "Technology deleted." });
  } catch (error) {
    console.error("Failed to delete technology:", error);
    return res.status(500).json({ message: "Failed to delete technology." });
  }
}
