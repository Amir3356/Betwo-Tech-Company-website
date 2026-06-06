import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  getAllLeadership,
  createLeadership,
  findLeadershipById,
  updateLeadership,
  deleteLeadershipById,
} from "../models/experiencedLeadership.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../storage/leadership");

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
  let image = null;

  if (req.file) {
    image = `/storage/leadership/${req.file.filename}`;
  }

  if (!name || !name.trim()) {
    return res.status(400).json({ message: "Name is required." });
  }

  try {
    const item = await createLeadership({
      name: name.trim(),
      position: (position || "").trim(),
      bio: bio || "",
      image,
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

    let image = existing.image;
    if (req.file) {
      if (existing.image) {
        const oldPath = path.join(__dirname, "..", existing.image);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      image = `/storage/leadership/${req.file.filename}`;
    }

    const item = await updateLeadership(id, {
      name: name.trim(),
      position: (position || existing.position || "").trim(),
      bio: bio ?? existing.bio ?? "",
      image,
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

    if (existing.image) {
      const filePath = path.join(__dirname, "..", existing.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await deleteLeadershipById(id);
    return res.json({ message: "Leadership member deleted." });
  } catch (error) {
    console.error("Failed to delete leadership member:", error);
    return res.status(500).json({ message: "Failed to delete leadership member." });
  }
}
