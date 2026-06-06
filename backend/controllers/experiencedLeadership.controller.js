import {
  getAllLeadership,
  createLeadership,
  findLeadershipById,
  updateLeadership,
  deleteLeadershipById,
} from "../models/experiencedLeadership.model.js";

export async function getLeadership(req, res) {
  try {
    const items = await getAllLeadership();
    return res.json({ data: items });
  } catch (error) {
    console.error("Failed to fetch leadership:", error);
    return res.status(500).json({ message: "Failed to load leadership." });
  }
}

export async function getLeadershipById(req, res) {
  const { id } = req.params;

  try {
    const item = await findLeadershipById(id);
    if (!item) {
      return res.status(404).json({ message: "Leadership member not found." });
    }
    return res.json({ data: item });
  } catch (error) {
    console.error("Failed to fetch leadership member:", error);
    return res.status(500).json({ message: "Failed to load leadership member." });
  }
}

export async function createLeadershipHandler(req, res) {
  const { name, position, bio } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required." });
  }

  try {
    const item = await createLeadership({
      name: name.trim(),
      position: (position || "").trim(),
      bio: bio || "",
    });

    return res.status(201).json({ message: "Leadership member created.", data: item });
  } catch (error) {
    console.error("Failed to create leadership member:", error);
    return res.status(500).json({ message: "Failed to create leadership member." });
  }
}

export async function updateLeadershipHandler(req, res) {
  const { id } = req.params;
  const { name, position, bio } = req.body || {};

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required." });
  }

  try {
    const existing = await findLeadershipById(id);
    if (!existing) {
      return res.status(404).json({ message: "Leadership member not found." });
    }

    const item = await updateLeadership(id, {
      name: name.trim(),
      position: (position || existing.position || "").trim(),
      bio: bio ?? existing.bio ?? "",
    });

    return res.json({ message: "Leadership member updated.", data: item });
  } catch (error) {
    console.error("Failed to update leadership member:", error);
    return res.status(500).json({ message: "Failed to update leadership member." });
  }
}

export async function deleteLeadershipHandler(req, res) {
  const { id } = req.params;

  try {
    const existing = await findLeadershipById(id);
    if (!existing) {
      return res.status(404).json({ message: "Leadership member not found." });
    }

    await deleteLeadershipById(id);
    return res.json({ message: "Leadership member deleted." });
  } catch (error) {
    console.error("Failed to delete leadership member:", error);
    return res.status(500).json({ message: "Failed to delete leadership member." });
  }
}
