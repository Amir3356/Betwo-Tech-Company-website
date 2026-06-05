import { pool } from "../config/db.js";

export async function getAllProjects() {
  const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
  return result.rows;
}

export async function createProject(data) {
  const result = await pool.query(
    `INSERT INTO projects (title, category, uptime, duration, description, detail, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [data.title, data.category, data.uptime, data.duration, data.description, data.detail || "", data.image]
  );
  return result.rows[0];
}

export async function findProjectById(id) {
  const result = await pool.query("SELECT * FROM projects WHERE id = $1", [id]);
  return result.rows[0];
}

export async function updateProject(id, data) {
  const result = await pool.query(
    `UPDATE projects SET title = $1, category = $2, uptime = $3, duration = $4, description = $5, detail = $6, image = $7, updated_at = NOW() WHERE id = $8 RETURNING *`,
    [data.title, data.category, data.uptime, data.duration, data.description, data.detail || "", data.image, id]
  );
  return result.rows[0];
}

export async function deleteProjectById(id) {
  await pool.query("DELETE FROM projects WHERE id = $1", [id]);
}
