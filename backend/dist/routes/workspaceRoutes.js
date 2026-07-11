"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../utils/authMiddleware");
const Workspace_1 = __importDefault(require("../models/Workspace"));
const logger_1 = require("../config/logger");
const router = express_1.default.Router();
/**
 * @route GET /api/workspaces
 * @desc Get all workspaces for the authenticated user
 * @access Private
 */
router.get('/', authMiddleware_1.protect, async (req, res) => {
    try {
        const workspaces = await Workspace_1.default.find({
            $or: [{ ownerId: req.researcher._id }, { collaborators: req.researcher._id }]
        });
        res.status(200).json(workspaces);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error fetching workspaces: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
/**
 * @route POST /api/workspaces
 * @desc Create a new research workspace
 * @access Private
 */
router.post('/', authMiddleware_1.protect, async (req, res) => {
    try {
        const { title, institution, researchFocus, diseaseCategory, keywords, studyObjectives } = req.body;
        const workspace = await Workspace_1.default.create({
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
    }
    catch (error) {
        logger_1.logger.error(`[API] Error creating workspace: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
