import { pool } from "../config/db.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../../storage/projects");

export async function getProjects(req, res) {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
    return res.json({ data: result.rows });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return res.status(500).json({ message: "Failed to load projects." });
  }
}

export async function createProject(req, res) {
  const { title, category, uptime, duration, description } = req.body || {};
  let image = null;

  if (req.file) {
    image = `/storage/projects/${req.file.filename}`;
  }

  if (!title || !category) {
    return res.status(400).json({ message: "Title and category are required." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO projects (title, category, uptime, duration, description, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [title.trim(), category.trim(), uptime || "99.9%", duration || "", description || "", image]
    );

    return res.status(201).json({ message: "Project created.", data: result.rows[0] });
  } catch (error) {
    console.error("Failed to create project:", error);
    return res.status(500).json({ message: "Failed to create project." });
  }
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const { title, category, uptime, duration, description } = req.body || {};

  if (!title || !category) {
    return res.status(400).json({ message: "Title and category are required." });
  }

  try {
    const existing = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ message: "Project not found." });
    }

    let image = existing.rows[0].image;

    if (req.file) {
      if (image && image.startsWith("/storage/projects/")) {
        const oldPath = path.join(uploadDir, path.basename(image));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = `/storage/projects/${req.file.filename}`;
    }

    const result = await pool.query(
      `UPDATE projects SET title = $1, category = $2, uptime = $3, duration = $4, description = $5, image = $6, updated_at = NOW() WHERE id = $7 RETURNING *`,
      [title.trim(), category.trim(), uptime || "99.9%", duration || "", description || "", image, id]
    );

    return res.json({ message: "Project updated.", data: result.rows[0] });
  } catch (error) {
    console.error("Failed to update project:", error);
    return res.status(500).json({ message: "Failed to update project." });
  }
}

export async function deleteProject(req, res) {
  const { id } = req.params;

  try {
    const existing = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
    if (existing.rowCount === 0) {
      return res.status(404).json({ message: "Project not found." });
    }

    const image = existing.rows[0].image;
    if (image && image.startsWith("/storage/projects/")) {
      const filePath = path.join(uploadDir, path.basename(image));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await pool.query("DELETE FROM projects WHERE id = $1", [id]);
    return res.json({ message: "Project deleted." });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return res.status(500).json({ message: "Failed to delete project." });
  }
}
