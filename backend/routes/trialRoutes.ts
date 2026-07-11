import express from 'express';
import { protect } from '../utils/authMiddleware';
import Trial from '../models/Trial';
import { logger } from '../config/logger';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const trials = await Trial.find(req.query);
    res.status(200).json(trials);
  } catch (error: any) {
    logger.error(`[API] Error fetching trials: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const trial = await Trial.create(req.body);
    res.status(201).json(trial);
  } catch (error: any) {
    logger.error(`[API] Error creating trial: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const trial = await Trial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(trial);
  } catch (error: any) {
    logger.error(`[API] Error updating trial: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Trial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Trial deleted successfully' });
  } catch (error: any) {
    logger.error(`[API] Error deleting trial: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

export default router;
