import { readSection, writeSection } from "../models/experiencedLeadership.model.js";

export async function getSection(req, res) {
  try {
    const content = await readSection();
    return res.json({ data: content });
  } catch (error) {
    console.error("Failed to fetch leadership section:", error);
    return res.status(500).json({ message: "Failed to load section." });
  }
}

export async function updateSection(req, res) {
  const { title, subtitle, description } = req.body || {};

  try {
    const current = await readSection();

    const next = {
      title: typeof title === "string" ? title.trim() : current.title,
      subtitle: typeof subtitle === "string" ? subtitle.trim() : current.subtitle,
      description: typeof description === "string" ? description.trim() : current.description,
    };

    await writeSection(next);
    return res.json({ message: "Section updated.", data: next });
  } catch (error) {
    console.error("Failed to update leadership section:", error);
    return res.status(500).json({ message: "Failed to update section." });
  }
}
