import express from "express";
import {
  getLeadership,
  getLeadershipById,
  createLeadershipHandler,
  updateLeadershipHandler,
  deleteLeadershipHandler,
} from "../controllers/experiencedLeadership.controller.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getLeadership);
router.get("/:id", getLeadershipById);
router.post("/", ensureAdmin, createLeadershipHandler);
router.put("/:id", ensureAdmin, updateLeadershipHandler);
router.delete("/:id", ensureAdmin, deleteLeadershipHandler);

export default router;
