import { pool } from "../config/db.js";

function parsePoints(raw) {
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "string") {
    try { return JSON.parse(raw); } catch { return []; }
  }
  return [];
}

export async function getServices(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM services ORDER BY position ASC, id ASC"
    );
    return res.json({ data: result.rows });
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
    const posResult = await pool.query(
      "SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM services"
    );
    const position = posResult.rows[0].next_pos;

    const result = await pool.query(
      `INSERT INTO services (icon, title, description, points, image, position)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [icon || "Code", title.trim(), description.trim(), JSON.stringify(parsePoints(points)), image, position]
    );

    return res.status(201).json({ message: "Service added.", data: result.rows[0] });
  } catch (error) {
    console.error("Failed to add service:", error);
    return res.status(500).json({ message: "Failed to add service." });
  }
}

export async function updateService(req, res) {
  const { id } = req.params;
  const { title, description, points, icon } = req.body || {};

  try {
    const existing = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Service not found." });
    }

    const current = existing.rows[0];
    const image = req.file ? `/storage/services/${req.file.filename}` : current.image;

    const result = await pool.query(
      `UPDATE services
       SET icon = $1, title = $2, description = $3, points = $4, image = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        icon || current.icon,
        typeof title === "string" ? title.trim() : current.title,
        typeof description === "string" ? description.trim() : current.description,
        JSON.stringify(parsePoints(points ?? current.points)),
        image,
        id,
      ]
    );

    return res.json({ message: "Service updated.", data: result.rows[0] });
  } catch (error) {
    console.error("Failed to update service:", error);
    return res.status(500).json({ message: "Failed to update service." });
  }
}

export async function deleteService(req, res) {
  const { id } = req.params;

  try {
    const del = await pool.query(
      "DELETE FROM services WHERE id = $1 RETURNING *",
      [id]
    );

    if (del.rows.length === 0) {
      return res.status(404).json({ message: "Service not found." });
    }

    const remaining = await pool.query(
      "SELECT * FROM services ORDER BY position ASC, id ASC"
    );
    return res.json({ message: "Service deleted.", data: remaining.rows });
  } catch (error) {
    console.error("Failed to delete service:", error);
    return res.status(500).json({ message: "Failed to delete service." });
  }
}
