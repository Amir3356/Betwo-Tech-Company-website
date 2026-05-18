import 'dotenv/config';
import mysql from 'mysql2/promise';

const createContactSubmissionsTableQuery = `
  CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'betwo_tech_contact_form',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
});

async function ensureDatabaseSchema() {
  await pool.query(createContactSubmissionsTableQuery);
}

async function checkDatabaseConnection() {
  const [rows] = await pool.query('SELECT 1 AS connected');
  return rows?.[0]?.connected === 1;
}

export { pool, ensureDatabaseSchema, checkDatabaseConnection };
