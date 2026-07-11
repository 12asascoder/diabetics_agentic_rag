"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../utils/authMiddleware");
const orchestratorAgent_1 = require("../agents/orchestratorAgent");
const logger_1 = require("../config/logger");
const router = express_1.default.Router();
/**
 * @route POST /api/agents/research
 * @desc Trigger the orchestrator agent for a specific research query
 * @access Private
 */
router.post('/research', authMiddleware_1.protect, async (req, res) => {
    try {
        const { query, workspaceId } = req.body;
        if (!query || !workspaceId) {
            res.status(400).json({ message: 'Query and workspaceId are required.' });
            return;
        }
        logger_1.logger.info(`[API] Received research request for workspace ${workspaceId}`);
        // Run the multi-agent orchestrator
        const result = await (0, orchestratorAgent_1.runResearchOrchestration)(query, workspaceId);
        if (result.currentStep === 'error') {
            res.status(500).json({ message: 'Orchestrator encountered errors', errors: result.errors });
            return;
        }
        res.status(200).json(result);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error in agent router: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
