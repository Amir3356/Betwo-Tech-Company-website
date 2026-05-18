import { pool } from '../config/db.js';

async function createContactSubmission({ name, email, subject, message }) {
  const [result] = await pool.query(
    `
      INSERT INTO contact_submissions (name, email, subject, message)
      VALUES (?, ?, ?, ?)
    `,
    [name.trim(), email.trim(), subject.trim(), message.trim()]
  );

  return {
    id: result.insertId,
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
  };
}

export { createContactSubmission };