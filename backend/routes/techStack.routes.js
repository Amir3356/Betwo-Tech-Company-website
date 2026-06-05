import express from "express";
import {
  getTechStack,
  getTechStackById,
  createTechStackHandler,
  updateTechStackHandler,
  deleteTechStackHandler,
} from "../controllers/techStack.controller.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getTechStack);
router.get("/:id", getTechStackById);
router.post("/", ensureAdmin, createTechStackHandler);
router.put("/:id", ensureAdmin, updateTechStackHandler);
router.delete("/:id", ensureAdmin, deleteTechStackHandler);

export default router;
