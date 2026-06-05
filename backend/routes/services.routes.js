import express from "express";
import { getServices as getPublicServices } from "../controllers/services.controller.js";
import {
  getServices as getAdminServices,
  addService,
  updateService,
  deleteService,
} from "../controllers/servicesAdmin.controller.js";
import { ensureAdmin } from "../middleware/adminAuth.js";
import { serviceUpload } from "../config/upload.js";

const router = express.Router();

router.get("/", getPublicServices);

router.get("/admin", ensureAdmin, getAdminServices);
router.post("/admin", ensureAdmin, serviceUpload.upload.single("image"), addService);
router.put("/admin/:id", ensureAdmin, serviceUpload.upload.single("image"), updateService);
router.delete("/admin/:id", ensureAdmin, deleteService);

export default router;
