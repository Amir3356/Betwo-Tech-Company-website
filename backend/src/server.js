import createApp from "./app.js";
import { pool, ensureDatabaseSchema } from "./config/db.js";

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
