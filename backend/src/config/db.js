import pkg from 'pg';

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const poolConfig = connectionString
  ? {
      connectionString,
      ssl:
        process.env.PGSSL === 'true'
          ? { rejectUnauthorized: false }
          : process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : undefined,
    }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'betwo_tech_contact_form',
      ssl:
        process.env.DB_SSL === 'true' || process.env.PGSSL === 'true'
          ? { rejectUnauthorized: false }
          : undefined,
    };

const pool = new Pool(poolConfig);

async function ensureDatabaseSchema() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

export { pool, ensureDatabaseSchema };
