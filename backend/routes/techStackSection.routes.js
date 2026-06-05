import express from "express";
import {
  getSection,
  updateSection,
} from "../controllers/techStackSection.controller.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getSection);
router.put("/", ensureAdmin, updateSection);

export default router;
