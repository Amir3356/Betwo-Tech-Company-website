import { pool } from "../config/db.js";

export async function getAllTechStack() {
  const result = await pool.query("SELECT * FROM tech_stack ORDER BY created_at DESC");
  return result.rows;
}

export async function createTechStack(data) {
  const result = await pool.query(
    `INSERT INTO tech_stack (icon, name, category, description) VALUES ($1, $2, $3, $4) RETURNING *`,
    [data.icon || "Code", data.name, data.category || "Other", data.description || ""]
  );
  return result.rows[0];
}

export async function findTechStackById(id) {
  const result = await pool.query("SELECT * FROM tech_stack WHERE id = $1", [id]);
  return result.rows[0];
}

export async function updateTechStack(id, data) {
  const result = await pool.query(
    `UPDATE tech_stack SET icon = $1, name = $2, category = $3, description = $4, updated_at = NOW() WHERE id = $5 RETURNING *`,
    [data.icon || "Code", data.name, data.category, data.description, id]
  );
  return result.rows[0];
}

export async function deleteTechStackById(id) {
  await pool.query("DELETE FROM tech_stack WHERE id = $1", [id]);
}

// ─── Tech Stack Section ──────────────────────────────

const defaults = {
  title: "Our Tech Stack",
  description: "Cutting-edge technologies we use to build powerful solutions",
};

export async function readSection() {
  const result = await pool.query(
    "SELECT title, description FROM tech_stack_section ORDER BY id LIMIT 1"
  );
  if (result.rows.length === 0) {
    return { ...defaults };
  }
  return result.rows[0];
}

export async function writeSection(content) {
  const existing = await pool.query("SELECT id FROM tech_stack_section ORDER BY id LIMIT 1");
  if (existing.rows.length === 0) {
    await pool.query(
      "INSERT INTO tech_stack_section (title, description) VALUES ($1, $2)",
      [content.title, content.description]
    );
  } else {
    await pool.query(
      "UPDATE tech_stack_section SET title = $1, description = $2, updated_at = NOW() WHERE id = $3",
      [content.title, content.description, existing.rows[0].id]
    );
  }
}
