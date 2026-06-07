import express from "express";
import cors from "cors";
import corsConfig from "./config/cors.js";
import createSessionMiddleware from "./config/session.js";
import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import projectRoutes from "./routes/project.routes.js";
import whatWeDoRoutes from "./routes/whatWeDo.routes.js";
import servicesRoutes from "./routes/services.routes.js";
import techStackRoutes from "./routes/techStack.routes.js";
import techStackSectionRoutes from "./routes/techStackSection.routes.js";
import experiencedLeadershipRoutes from "./routes/experiencedLeadership.routes.js";
import experiencedLeadershipSectionRoutes from "./routes/experiencedLeadershipSection.routes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createApp(pool) {
  const app = express();

  app.use(cors(corsConfig));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(createSessionMiddleware(pool));

  app.use("/storage/projects", express.static(path.join(__dirname, "storage/projects")));
  app.use("/storage/services", express.static(path.join(__dirname, "storage/services")));
  app.use("/storage/leadership", express.static(path.join(__dirname, "storage/leadership")));

  app.get("/health", (_req, res) => res.json({ ok: true }));

  app.use("/api/admin", authRoutes);
  app.use("/api/contact-messages", contactRoutes);
  app.use("/api/projects", projectRoutes);
  app.use("/api/what-we-do", whatWeDoRoutes);
  app.use("/api/services", servicesRoutes);
  app.use("/api/tech-stack", techStackRoutes);
  app.use("/api/tech-stack-section", techStackSectionRoutes);
  app.use("/api/experienced-leadership", experiencedLeadershipRoutes);
  app.use("/api/experienced-leadership-section", experiencedLeadershipSectionRoutes);


  return app;
}

export default createApp;
