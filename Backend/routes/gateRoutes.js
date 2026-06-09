import express from 'express';
import {
  getGates,
  updateGateWaterLevel,
  toggleGateStatus,
  createGate
} from '../controllers/gateController.js';

const router = express.Router();

router.get('/', getGates);
router.post('/create', createGate);
router.post('/update', updateGateWaterLevel);
router.post('/toggle', toggleGateStatus);

export default router;
