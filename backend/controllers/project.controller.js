import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { getAllProjects, createProject, findProjectById, updateProject, deleteProjectById } from "../models/project.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../storage/projects");

export async function getProjectById(req, res) {
  const { id } = req.params;

  try {
    const project = await findProjectById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }
    return res.json({ data: project });
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return res.status(500).json({ message: "Failed to load project." });
  }
}

export async function getProjects(req, res) {
  try {
    const projects = await getAllProjects();
    return res.json({ data: projects });
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return res.status(500).json({ message: "Failed to load projects." });
  }
}

export async function createProjectHandler(req, res) {
  const { title, category, uptime, duration, description, detail } = req.body || {};
  let image = null;

  if (req.file) {
    image = `/storage/projects/${req.file.filename}`;
  }

  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  try {
    const project = await createProject({
      title: title.trim(),
      category: (category || "General").trim(),
      uptime: uptime || "99.9%",
      duration: duration || "",
      description: description || "",
      detail: detail || "",
      image,
    });

    return res.status(201).json({ message: "Project created.", data: project });
  } catch (error) {
    console.error("Failed to create project:", error);
    return res.status(500).json({ message: "Failed to create project." });
  }
}

export async function updateProjectHandler(req, res) {
  const { id } = req.params;
  const { title, category, uptime, duration, description, detail } = req.body || {};

  if (!title) {
    return res.status(400).json({ message: "Title is required." });
  }

  try {
    const existing = await findProjectById(id);
    if (!existing) {
      return res.status(404).json({ message: "Project not found." });
    }

    let image = existing.image;

    if (req.file) {
      if (image && image.startsWith("/storage/projects/")) {
        const oldPath = path.join(uploadDir, path.basename(image));
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      image = `/storage/projects/${req.file.filename}`;
    }

    const project = await updateProject(id, {
      title: title.trim(),
      category: category ? category.trim() : existing.category,
      uptime: uptime || "99.9%",
      duration: duration || "",
      description: description || "",
      detail: detail !== undefined ? detail : existing.detail,
      image,
    });

    return res.json({ message: "Project updated.", data: project });
  } catch (error) {
    console.error("Failed to update project:", error);
    return res.status(500).json({ message: "Failed to update project." });
  }
}

export async function deleteProjectHandler(req, res) {
  const { id } = req.params;

  try {
    const existing = await findProjectById(id);
    if (!existing) {
      return res.status(404).json({ message: "Project not found." });
    }

    const image = existing.image;
    if (image && image.startsWith("/storage/projects/")) {
      const filePath = path.join(uploadDir, path.basename(image));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await deleteProjectById(id);
    return res.json({ message: "Project deleted." });
  } catch (error) {
    console.error("Failed to delete project:", error);
    return res.status(500).json({ message: "Failed to delete project." });
  }
}
