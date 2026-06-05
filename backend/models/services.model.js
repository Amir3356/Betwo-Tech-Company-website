import { pool } from "../config/db.js";

export async function getAllServices() {
  const result = await pool.query("SELECT * FROM services ORDER BY position ASC, id ASC");
  return result.rows;
}

export async function createService(data) {
  const posResult = await pool.query("SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM services");
  const position = posResult.rows[0].next_pos;
  const result = await pool.query(
    `INSERT INTO services (icon, title, description, points, image, position) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [data.icon, data.title, data.description, data.points, data.image, position]
  );
  return result.rows[0];
}

export async function findServiceById(id) {
  const result = await pool.query("SELECT * FROM services WHERE id = $1", [id]);
  return result.rows[0];
}

export async function updateService(id, data) {
  const result = await pool.query(
    `UPDATE services SET icon = $1, title = $2, description = $3, points = $4, image = $5, updated_at = NOW() WHERE id = $6 RETURNING *`,
    [data.icon, data.title, data.description, data.points, data.image, id]
  );
  return result.rows[0];
}

export async function deleteServiceById(id) {
  const result = await pool.query("DELETE FROM services WHERE id = $1 RETURNING *", [id]);
  return result.rows[0];
}
