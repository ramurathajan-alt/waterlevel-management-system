import express from 'express';
import { sendGateStatusSmsAlert } from '../controllers/alertController.js';

const router = express.Router();

// POST /api/alerts/sms/:lang/:type
router.post('/sms/:lang/:type', sendGateStatusSmsAlert);

export default router;
