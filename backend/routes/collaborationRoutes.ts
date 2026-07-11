import express from 'express';
import { protect } from '../utils/authMiddleware';
import CollaborationTask from '../models/CollaborationTask';
import Comment from '../models/Comment';
import { logger } from '../config/logger';

const router = express.Router();

// Tasks
router.get('/tasks', protect, async (req, res) => {
  try {
    const tasks = await CollaborationTask.find({ workspaceId: req.query.workspaceId }).populate('assignedTo createdBy', 'name email');
    res.status(200).json(tasks);
  } catch (error: any) {
    logger.error(`[API] Error fetching tasks: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.post('/tasks', protect, async (req, res) => {
  try {
    const task = await CollaborationTask.create({ ...req.body, createdBy: req.researcher._id });
    res.status(201).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/tasks/:id', protect, async (req, res) => {
  try {
    const task = await CollaborationTask.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Comments
router.get('/comments', protect, async (req, res) => {
  try {
    const comments = await Comment.find({ targetId: req.query.targetId }).populate('createdBy', 'name email');
    res.status(200).json(comments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/comments', protect, async (req, res) => {
  try {
    const comment = await Comment.create({ ...req.body, createdBy: req.researcher._id });
    res.status(201).json(comment);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
