import express from 'express';
import { protect } from '../utils/authMiddleware';
import Workspace from '../models/Workspace';
import { logger } from '../config/logger';

const router = express.Router();

/**
 * @route GET /api/workspaces
 * @desc Get all workspaces for the authenticated user
 * @access Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const workspaces = await Workspace.find({ 
      $or: [{ ownerId: req.researcher._id }, { collaborators: req.researcher._id }]
    });
    res.status(200).json(workspaces);
  } catch (error: any) {
    logger.error(`[API] Error fetching workspaces: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

/**
 * @route POST /api/workspaces
 * @desc Create a new research workspace
 * @access Private
 */
router.post('/', protect, async (req, res) => {
  try {
    const { title, institution, researchFocus, diseaseCategory, keywords, studyObjectives } = req.body;

    const workspace = await Workspace.create({
      title,
      institution,
      researchFocus,
      diseaseCategory,
      keywords,
      studyObjectives,
      ownerId: req.researcher._id,
      collaborators: []
    });

    res.status(201).json(workspace);
  } catch (error: any) {
    logger.error(`[API] Error creating workspace: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

export default router;
