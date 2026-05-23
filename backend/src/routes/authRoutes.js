import express from "express";
import { login, me, logout } from "../controllers/authController.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", ensureAdmin, me);
router.post("/logout", ensureAdmin, logout);

export default router;
