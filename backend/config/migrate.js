import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, "../migrations");

export default async function migrate(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      name VARCHAR(255) PRIMARY KEY,
      run_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  const { rows: applied } = await pool.query("SELECT name FROM _migrations ORDER BY name");
  const appliedSet = new Set(applied.map((r) => r.name));

  const files = fs
    .readdirSync(migrationsDir)
    .filter((f) => f.endsWith(".sql"))
    .sort();

  for (const file of files) {
    if (appliedSet.has(file)) continue;

    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");

    await pool.query("BEGIN");
    try {
      await pool.query(sql);
      await pool.query("INSERT INTO _migrations (name) VALUES ($1)", [file]);
      await pool.query("COMMIT");
      console.log(`  ✓ ${file}`);
    } catch (err) {
      await pool.query("ROLLBACK");
      console.error(`  ✗ ${file} — ${err.message}`);
      throw err;
    }
  }
}
