import express from 'express';
import { protect } from '../utils/authMiddleware';
import RegistryItem from '../models/RegistryItem';
import { logger } from '../config/logger';

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const items = await RegistryItem.find(req.query);
    res.status(200).json(items);
  } catch (error: any) {
    logger.error(`[API] Error fetching registry items: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const item = await RegistryItem.create({ ...req.body, createdBy: req.researcher._id });
    res.status(201).json(item);
  } catch (error: any) {
    logger.error(`[API] Error creating registry item: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const item = await RegistryItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(item);
  } catch (error: any) {
    logger.error(`[API] Error updating registry item: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await RegistryItem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Registry item deleted successfully' });
  } catch (error: any) {
    logger.error(`[API] Error deleting registry item: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

export default router;
