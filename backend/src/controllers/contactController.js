import { pool } from "../config/db.js";
export async function createContactMessage(req, res) {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name.trim(), email.trim(), (subject || "").trim(), message.trim()]
    );

    return res.status(201).json({ message: "Message sent successfully.", data: result.rows[0] });
  } catch (error) {
    console.error("Failed to save contact message:", error);
    return res.status(500).json({ message: "Failed to send message." });
  }
}

export async function getContactMessages(req, res) {
  try {
    const result = await pool.query("SELECT * FROM contact_messages ORDER BY created_at DESC");
    return res.json({ data: result.rows });
  } catch (error) {
    console.error("Failed to fetch contact messages:", error);
    return res.status(500).json({ message: "Failed to load messages." });
  }
}

export async function deleteContactMessage(req, res) {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM contact_messages WHERE id = $1 RETURNING id", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Message not found." });
    }

    return res.json({ message: "Message deleted." });
  } catch (error) {
    console.error("Failed to delete contact message:", error);
    return res.status(500).json({ message: "Failed to delete message." });
  }
}
