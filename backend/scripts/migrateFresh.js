import "dotenv/config";
import { pool } from "../config/db.js";
import migrate from "../config/migrate.js";

async function main() {
  await pool.query(
    "DROP TABLE IF EXISTS what_we_do, services, projects, contact_messages, admin_users, tech_stack, tech_stack_section, _migrations CASCADE"
  );
  console.log("Tables dropped.");
  await migrate(pool);
  console.log("Done.");
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
