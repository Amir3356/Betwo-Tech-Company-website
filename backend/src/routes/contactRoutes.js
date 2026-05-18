import express from 'express';
import { handleCreateContactSubmission } from '../controllers/contactController.js';
import validateContactSubmission from '../middleware/validateContactSubmission.js';

const router = express.Router();

router.post('/', validateContactSubmission, handleCreateContactSubmission);

export default router;
