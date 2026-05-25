import express from "express";
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
import { ensureAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getServices);
router.put("/", ensureAdmin, updateServices);
router.post("/comprehensive", ensureAdmin, addComprehensiveService);
router.put("/comprehensive/:index", ensureAdmin, updateComprehensiveService);
router.delete("/comprehensive/:index", ensureAdmin, deleteComprehensiveService);
router.post("/deepdives", ensureAdmin, addDeepDive);
router.put("/deepdives/:index", ensureAdmin, updateDeepDive);
router.delete("/deepdives/:index", ensureAdmin, deleteDeepDive);
router.post("/process-steps", ensureAdmin, addProcessStep);
router.put("/process-steps/:index", ensureAdmin, updateProcessStep);
router.delete("/process-steps/:index", ensureAdmin, deleteProcessStep);

export default router;
