import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilePath);
const databaseSqlPath = resolve(currentDirectory, '../../database.sql');

const createContactSubmissionsTableQuery = readFileSync(databaseSqlPath, 'utf8');

async function ensureContactSubmissionsTable(pool) {
  await pool.query(createContactSubmissionsTableQuery);
}

export { ensureContactSubmissionsTable };