import express from 'express';
import { protect } from '../utils/authMiddleware';
import Protocol from '../models/Protocol';
import { logger } from '../config/logger';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const protocols = await Protocol.find({ workspaceId: req.query.workspaceId });
    res.status(200).json(protocols);
  } catch (error: any) {
    logger.error(`[API] Error fetching protocols: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const protocol = await Protocol.create({ ...req.body, createdBy: req.researcher._id });
    res.status(201).json(protocol);
  } catch (error: any) {
    logger.error(`[API] Error creating protocol: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const protocol = await Protocol.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(protocol);
  } catch (error: any) {
    logger.error(`[API] Error updating protocol: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Protocol.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Protocol deleted successfully' });
  } catch (error: any) {
    logger.error(`[API] Error deleting protocol: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

export default router;
