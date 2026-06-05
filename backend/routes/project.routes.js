import express from "express";
import {
	getProjects,
	getProjectById,
	createProjectHandler,
	updateProjectHandler,
	deleteProjectHandler,
} from "../controllers/project.controller.js";
import { ensureAdmin } from "../middleware/adminAuth.js";
import { projectUpload } from "../config/upload.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", ensureAdmin, projectUpload.upload.single("image"), createProjectHandler);
router.put("/:id", ensureAdmin, projectUpload.upload.single("image"), updateProjectHandler);
router.delete("/:id", ensureAdmin, deleteProjectHandler);

export default router;
