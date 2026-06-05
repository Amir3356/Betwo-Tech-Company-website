import { pool } from "../config/db.js";

const defaultContent = {
  title: "What We Do?",
  description: "We deliver custom software solutions that drive digital transformation and business growth.",
  services: [],
};

export async function readWhatWeDo() {
  const result = await pool.query(
    "SELECT title, description, services FROM what_we_do ORDER BY id LIMIT 1"
  );

  if (result.rows.length === 0) {
    return { ...defaultContent };
  }

  const row = result.rows[0];
  return {
    title: row.title,
    description: row.description,
    services: row.services || [],
  };
}

export async function writeWhatWeDo(content) {
  const services = JSON.stringify(content.services || []);
  const existing = await pool.query(
    "SELECT id FROM what_we_do ORDER BY id LIMIT 1"
  );

  if (existing.rows.length === 0) {
    await pool.query(
      "INSERT INTO what_we_do (title, description, services) VALUES ($1, $2, $3::jsonb)",
      [content.title, content.description, services]
    );
  } else {
    await pool.query(
      "UPDATE what_we_do SET title = $1, description = $2, services = $3::jsonb, updated_at = NOW() WHERE id = $4",
      [content.title, content.description, services, existing.rows[0].id]
    );
  }
}
