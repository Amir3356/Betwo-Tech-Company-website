import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getServices as getPublicServices } from "../controllers/servicesController.js";
import {
  getServices as getAdminServices,
  addService,
  updateService,
  deleteService,
} from "../controllers/servicesAdminController.js";
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

router.get("/", getPublicServices);

router.get("/admin", ensureAdmin, getAdminServices);
router.post("/admin", ensureAdmin, upload.single("image"), addService);
router.put("/admin/:id", ensureAdmin, upload.single("image"), updateService);
router.delete("/admin/:id", ensureAdmin, deleteService);

export default router;
