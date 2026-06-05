import { pool } from "../config/db.js";

export async function createMessage({ name, email, subject, message }) {
  const result = await pool.query(
    `INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`,
    [name.trim(), email.trim(), (subject || "").trim(), message.trim()]
  );
  return result.rows[0];
}

export async function getAllMessages() {
  const result = await pool.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
  return result.rows;
}

export async function deleteMessageById(id) {
  const result = await pool.query("DELETE FROM contact_messages WHERE id = $1 RETURNING id", [id]);
  return result.rowCount;
}
