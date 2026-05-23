import pkg from "pg";
import { execSync } from "child_process";

const { Client } = pkg;

const dbName = process.env.DB_NAME || "betwo_tech";
const config = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
};

async function setupDatabase() {
  const client = new Client(config);

  try {
    await client.connect();

    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }

    await client.end();
    process.exit(0);
  } catch (error) {
    console.error("Failed to create database:", error.message);
    process.exit(1);
  }
}

setupDatabase();
