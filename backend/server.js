import "dotenv/config";
import createApp from "./app.js";
import { pool } from "./config/db.js";
import migrate from "./config/migrate.js";

const app = createApp(pool);
const port = Number(process.env.PORT);

async function startServer() {
  try {
    await migrate(pool);
    console.log("PostgreSQL and Express.js connected");
    const server = app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use. Set a different PORT in backend/.env.`);
      } else {
        console.error("Failed to start server:", error);
      }

      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
