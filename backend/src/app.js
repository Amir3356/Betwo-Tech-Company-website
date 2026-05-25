import express from "express";
import cors from "cors";
import session from "express-session";
import pgSession from "connect-pg-simple";
import authRoutes from "./routes/authRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import whatWeDoRoutes from "./routes/whatWeDoRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createApp(pool) {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  const PgStore = pgSession(session);

  app.use(
    session({
      store: new PgStore({ pool, createTableIfMissing: true }),
      secret: process.env.SESSION_SECRET || "dev-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === "production", httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
    })
  );

  app.use("/storage/projects", express.static(path.join(__dirname, "../storage/projects")));

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/api/admin", authRoutes);
  app.use("/api/contact-messages", contactRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/what-we-do", whatWeDoRoutes);

  return app;
}

export default createApp;
