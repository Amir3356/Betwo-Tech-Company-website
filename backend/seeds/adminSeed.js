import "dotenv/config";
import bcrypt from "bcrypt";
import { pool } from "../config/db.js";

async function seedAdmin() {
  const username = process.env.SEED_ADMIN_USERNAME || "Betwo";
  const password = process.env.SEED_ADMIN_PASSWORD || "1234";
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    const existing = await pool.query("SELECT id FROM admin_users WHERE username = $1", [username]);
    if (existing.rowCount > 0) {
      console.log("Admin user already exists.");
      return;
    }

    await pool.query("INSERT INTO admin_users (username, password_hash) VALUES ($1, $2)", [username, passwordHash]);
    console.log(`Admin user created: ${username} / ${password}`);
  } catch (error) {
    console.error("Seed error:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seedAdmin();
