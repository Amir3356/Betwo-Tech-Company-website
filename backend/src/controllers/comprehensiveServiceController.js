import { pool } from "../config/db.js";

export async function getComprehensiveServices(req, res) {
  try {
    const result = await pool.query(
      "SELECT * FROM comprehensive_services ORDER BY position ASC, id ASC"
    );
    return res.json({ data: result.rows });
  } catch (error) {
    console.error("Failed to load comprehensive services:", error);
    return res.status(500).json({ message: "Failed to load comprehensive services." });
  }
}

export async function addComprehensiveService(req, res) {
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
      "SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM comprehensive_services"
    );
    const position = posResult.rows[0].next_pos;

    const result = await pool.query(
      `INSERT INTO comprehensive_services (icon, title, description, points, image, position)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [icon || "Code", title.trim(), description.trim(), JSON.stringify(points || []), image, position]
    );

    return res.status(201).json({ message: "Comprehensive service added.", data: result.rows[0] });
  } catch (error) {
    console.error("Failed to add comprehensive service:", error);
    return res.status(500).json({ message: "Failed to add service." });
  }
}

export async function updateComprehensiveService(req, res) {
  const { id } = req.params;
  const { title, description, points, icon } = req.body || {};

  try {
    const existing = await pool.query("SELECT * FROM comprehensive_services WHERE id = $1", [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ message: "Service not found." });
    }

    const current = existing.rows[0];
    const image = req.file ? `/storage/services/${req.file.filename}` : current.image;

    const result = await pool.query(
      `UPDATE comprehensive_services
       SET icon = $1, title = $2, description = $3, points = $4, image = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [
        icon || current.icon,
        typeof title === "string" ? title.trim() : current.title,
        typeof description === "string" ? description.trim() : current.description,
        JSON.stringify(Array.isArray(points) ? points : current.points),
        image,
        id,
      ]
    );

    return res.json({ message: "Comprehensive service updated.", data: result.rows[0] });
  } catch (error) {
    console.error("Failed to update comprehensive service:", error);
    return res.status(500).json({ message: "Failed to update service." });
  }
}

export async function deleteComprehensiveService(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM comprehensive_services WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.json({ message: "Comprehensive service deleted.", data: result.rows });
  } catch (error) {
    console.error("Failed to delete comprehensive service:", error);
    return res.status(500).json({ message: "Failed to delete service." });
  }
}
