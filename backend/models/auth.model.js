import { pool } from "../config/db.js";

export async function findUserByUsername(username) {
  const result = await pool.query("SELECT * FROM admin_users WHERE username = $1", [username.trim()]);
  return result.rows[0];
}

export async function findUserById(id) {
  const result = await pool.query("SELECT id, username FROM admin_users WHERE id = $1", [id]);
  return result.rows[0];
}
