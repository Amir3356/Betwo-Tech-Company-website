import { pool } from '../config/db.js';

async function createContactSubmission(req, res) {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      message: 'Name, email, subject, and message are required.',
    });
  }

  try {
    const result = await pool.query(
      `
        INSERT INTO contact_submissions (name, email, subject, message)
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, subject, message, created_at
      `,
      [name.trim(), email.trim(), subject.trim(), message.trim()]
    );

    return res.status(201).json({
      message: 'Contact form saved successfully.',
      submission: result.rows[0],
    });
  } catch (error) {
    console.error('Failed to save contact submission:', error);
    return res.status(500).json({
      message: 'Failed to save contact submission.',
    });
  }
}

export { createContactSubmission };
