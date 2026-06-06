import express from "express";
import {
  getLeadership,
  getLeadershipById,
  createLeadershipHandler,
  updateLeadershipHandler,
  deleteLeadershipHandler,
} from "../controllers/experiencedLeadership.controller.js";
import { ensureAdmin } from "../middleware/adminAuth.js";
import { leadershipUpload } from "../config/upload.js";

const router = express.Router();

router.get("/", getLeadership);
router.get("/:id", getLeadershipById);
router.post("/", ensureAdmin, leadershipUpload.upload.single("image"), createLeadershipHandler);
router.put("/:id", ensureAdmin, leadershipUpload.upload.single("image"), updateLeadershipHandler);
router.delete("/:id", ensureAdmin, deleteLeadershipHandler);

export default router;
