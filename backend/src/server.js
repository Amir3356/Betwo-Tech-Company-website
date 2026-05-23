import createApp from "./app.js";
import { ensureDatabaseSchema } from "./config/db.js";
import pkg from "pg";

const { Pool } = pkg;

const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined }
  : {
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER || "postgres",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "betwo_tech",
    };

const pool = new Pool(poolConfig);

const port = process.env.PORT || 5000;
const app = createApp(pool);

async function startServer() {
  try {
    await ensureDatabaseSchema();
    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
