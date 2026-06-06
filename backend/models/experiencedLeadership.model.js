import { pool } from "../config/db.js";

export async function getAllLeadership() {
  const result = await pool.query(
    "SELECT * FROM experienced_leadership ORDER BY display_order ASC, created_at DESC"
  );
  return result.rows;
}

export async function createLeadership(data) {
  const result = await pool.query(
    `INSERT INTO experienced_leadership (name, position, bio, linkedin, display_order)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [data.name, data.position || "", data.bio || "", data.linkedin || "", data.display_order || 0]
  );
  return result.rows[0];
}

export async function findLeadershipById(id) {
  const result = await pool.query("SELECT * FROM experienced_leadership WHERE id = $1", [id]);
  return result.rows[0];
}

export async function updateLeadership(id, data) {
  const result = await pool.query(
    `UPDATE experienced_leadership
     SET name = $1, position = $2, bio = $3, linkedin = $4, display_order = $5, updated_at = NOW()
     WHERE id = $6 RETURNING *`,
    [data.name, data.position, data.bio, data.linkedin, data.display_order, id]
  );
  return result.rows[0];
}

export async function deleteLeadershipById(id) {
  await pool.query("DELETE FROM experienced_leadership WHERE id = $1", [id]);
}
