import { pool } from "../config/db.js";

export async function getAllLeadership() {
  const result = await pool.query(
    "SELECT * FROM experienced_leadership ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function createLeadership(data) {
  const result = await pool.query(
    `INSERT INTO experienced_leadership (name, position, bio) VALUES ($1, $2, $3) RETURNING *`,
    [data.name, data.position || "", data.bio || ""]
  );
  return result.rows[0];
}

export async function findLeadershipById(id) {
  const result = await pool.query("SELECT * FROM experienced_leadership WHERE id = $1", [id]);
  return result.rows[0];
}

export async function updateLeadership(id, data) {
  const result = await pool.query(
    `UPDATE experienced_leadership SET name = $1, position = $2, bio = $3, updated_at = NOW() WHERE id = $4 RETURNING *`,
    [data.name, data.position, data.bio, id]
  );
  return result.rows[0];
}

export async function deleteLeadershipById(id) {
  await pool.query("DELETE FROM experienced_leadership WHERE id = $1", [id]);
}

// ─── Section ──────────────────────────────────────────

const defaults = {
  title: "",
  subtitle: "",
  description: "",
};

export async function readSection() {
  const result = await pool.query(
    "SELECT title, subtitle, description FROM experienced_leadership_section ORDER BY id LIMIT 1"
  );
  if (result.rows.length === 0) {
    return { ...defaults };
  }
  return result.rows[0];
}

export async function writeSection(content) {
  const existing = await pool.query("SELECT id FROM experienced_leadership_section ORDER BY id LIMIT 1");
  if (existing.rows.length === 0) {
    await pool.query(
      "INSERT INTO experienced_leadership_section (title, subtitle, description) VALUES ($1, $2, $3)",
      [content.title, content.subtitle, content.description]
    );
  } else {
    await pool.query(
      "UPDATE experienced_leadership_section SET title = $1, subtitle = $2, description = $3, updated_at = NOW() WHERE id = $4",
      [content.title, content.subtitle, content.description, existing.rows[0].id]
    );
  }
}
