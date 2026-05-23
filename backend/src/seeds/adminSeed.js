import bcrypt from "bcrypt";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "betwo_tech",
});

async function seedAdmin() {
  const username = "admin";
  const password = "admin";
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const existing = await pool.query("SELECT id FROM admin_users WHERE username = $1", [username]);
    if (existing.rowCount > 0) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    await pool.query("INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)", [username, passwordHash]);
    console.log(`Admin user created: ${username} / ${password}`);
  } catch (error) {
    console.error("Seed error:", error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

seedAdmin();
