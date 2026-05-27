import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
	getProjects,
	createProject,
	updateProject,
	deleteProject,
} from "../controllers/projectController.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../../storage/projects");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => cb(null, uploadDir),
	filename: (_req, file, cb) => {
		const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
		cb(null, safeName);
	},
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", getProjects);
router.post("/", ensureAdmin, upload.single("image"), createProject);
router.put("/:id", ensureAdmin, upload.single("image"), updateProject);
router.delete("/:id", ensureAdmin, deleteProject);

export default router;
