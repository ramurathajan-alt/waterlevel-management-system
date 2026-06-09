// routes/smsRouter.js
import express from 'express';
import {
  sendOTP,
  verifyOTP,
  getVerifiedNumbers,
  deleteVerifiedNumber
} from '../controllers/smsController.js';

const router = express.Router();

router.post('/get', sendOTP);
router.post('/verify', verifyOTP);

// New routes to manage verified numbers
router.get('/verified', getVerifiedNumbers); // Get all verified numbers
router.delete('/verified/:phoneNumber', deleteVerifiedNumber); // Delete a specific number

export default router;
