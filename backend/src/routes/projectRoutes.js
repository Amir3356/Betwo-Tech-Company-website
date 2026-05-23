import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { getProjects, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../storage/projects"),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getProjects);
router.post("/", ensureAdmin, upload.single("image"), createProject);
router.post("/:id", ensureAdmin, upload.single("image"), updateProject);
router.delete("/:id", ensureAdmin, deleteProject);

export default router;
