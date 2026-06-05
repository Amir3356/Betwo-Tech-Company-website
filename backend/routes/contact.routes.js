import express from "express";
import { createContactMessage, getContactMessages, deleteContactMessage } from "../controllers/contact.controller.js";
import { ensureAdmin } from "../middleware/adminAuth.js";

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", ensureAdmin, getContactMessages);
router.delete("/:id", ensureAdmin, deleteContactMessage);

export default router;
