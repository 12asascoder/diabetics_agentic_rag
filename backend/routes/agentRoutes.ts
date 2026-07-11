import express from 'express';
import { protect } from '../utils/authMiddleware';
import { runResearchOrchestration } from '../agents/orchestratorAgent';
import { logger } from '../config/logger';

const router = express.Router();

/**
 * @route POST /api/agents/research
 * @desc Trigger the orchestrator agent for a specific research query
 * @access Private
 */
router.post('/research', protect, async (req, res) => {
  try {
    const { query, workspaceId } = req.body;

    if (!query || !workspaceId) {
      res.status(400).json({ message: 'Query and workspaceId are required.' });
      return;
    }

    logger.info(`[API] Received research request for workspace ${workspaceId}`);
    
    // Run the multi-agent orchestrator
    const result = await runResearchOrchestration(query, workspaceId);

    if (result.currentStep === 'error') {
      res.status(500).json({ message: 'Orchestrator encountered errors', errors: result.errors });
      return;
    }

    res.status(200).json(result);
  } catch (error: any) {
    logger.error(`[API] Error in agent router: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

export default router;
