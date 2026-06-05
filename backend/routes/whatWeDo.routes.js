import express from "express";
import {
  addWhatWeDoService,
  deleteWhatWeDoService,
  getWhatWeDo,
  updateWhatWeDo,
  updateWhatWeDoService,
} from "../controllers/whatWeDo.controller.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getWhatWeDo);
router.put("/", ensureAdmin, updateWhatWeDo);
router.post("/services", ensureAdmin, addWhatWeDoService);
router.put("/services/:index", ensureAdmin, updateWhatWeDoService);
router.delete("/services/:index", ensureAdmin, deleteWhatWeDoService);

export default router;
