import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getServices } from "../controllers/servicesController.js";
import {
  getComprehensiveServices as getAdminServices,
  addComprehensiveService as addAdminService,
  updateComprehensiveService as updateAdminService,
  deleteComprehensiveService as deleteAdminService,
} from "../controllers/comprehensiveServiceController.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../../storage/services");

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

router.get("/", getServices);

router.get("/admin", ensureAdmin, getAdminServices);
router.post("/admin", ensureAdmin, upload.single("image"), addAdminService);
router.put("/admin/:id", ensureAdmin, upload.single("image"), updateAdminService);
router.delete("/admin/:id", ensureAdmin, deleteAdminService);

export default router;
