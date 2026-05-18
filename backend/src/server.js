import createApp from './app.js';
import { ensureDatabaseSchema, checkDatabaseConnection } from './config/db.js';

const port = process.env.PORT || 5000;
const app = createApp();

async function startServer() {
  try {
    const connected = await checkDatabaseConnection();
    console.log(connected ? 'MySQL connected successfully.' : 'MySQL connection check failed.');
    await ensureDatabaseSchema();
    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start backend server:', error);
    process.exit(1);
  }
}

startServer();
