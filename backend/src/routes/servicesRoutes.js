import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  getServices,
  updateServices,
  addComprehensiveService,
  updateComprehensiveService,
  deleteComprehensiveService,
  addDeepDive,
  updateDeepDive,
  deleteDeepDive,
  addProcessStep,
  updateProcessStep,
  deleteProcessStep,
} from "../controllers/servicesController.js";
import {
  getComprehensiveServices,
  addComprehensiveService as addNewComprehensiveService,
  updateComprehensiveService as updateNewComprehensiveService,
  deleteComprehensiveService as deleteNewComprehensiveService,
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
router.put("/", ensureAdmin, updateServices);

router.get("/comprehensive-table", ensureAdmin, getComprehensiveServices);
router.post("/comprehensive-table", ensureAdmin, upload.single("image"), addNewComprehensiveService);
router.put("/comprehensive-table/:id", ensureAdmin, upload.single("image"), updateNewComprehensiveService);
router.delete("/comprehensive-table/:id", ensureAdmin, deleteNewComprehensiveService);

router.post("/comprehensive", ensureAdmin, upload.single("image"), addComprehensiveService);
router.put("/comprehensive/:index", ensureAdmin, upload.single("image"), updateComprehensiveService);
router.delete("/comprehensive/:index", ensureAdmin, deleteComprehensiveService);
router.post("/deepdives", ensureAdmin, addDeepDive);
router.put("/deepdives/:index", ensureAdmin, updateDeepDive);
router.delete("/deepdives/:index", ensureAdmin, deleteDeepDive);
router.post("/process-steps", ensureAdmin, addProcessStep);
router.put("/process-steps/:index", ensureAdmin, updateProcessStep);
router.delete("/process-steps/:index", ensureAdmin, deleteProcessStep);

export default router;
