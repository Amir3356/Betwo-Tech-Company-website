import "dotenv/config";
import createApp from "./app.js";
import { pool, ensureDatabaseSchema } from "./config/db.js";

const app = createApp(pool);

const preferredPort = Number(process.env.PORT || 5000);
const maxPortAttempts = 10;

function listenOnPort(port, attempt = 1) {
  const server = app.listen(port, () => {
    console.log(`Backend server running on port ${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE" && attempt < maxPortAttempts) {
      listenOnPort(port + 1, attempt + 1);
      return;
    }

    console.error(`Failed to start server on port ${port}:`, error);
    process.exit(1);
  });
}

async function startServer() {
  try {
    await ensureDatabaseSchema();
    listenOnPort(preferredPort);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
