"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../utils/authMiddleware");
const CollaborationTask_1 = __importDefault(require("../models/CollaborationTask"));
const Comment_1 = __importDefault(require("../models/Comment"));
const logger_1 = require("../config/logger");
const router = express_1.default.Router();
// Tasks
router.get('/tasks', authMiddleware_1.protect, async (req, res) => {
    try {
        const tasks = await CollaborationTask_1.default.find({ workspaceId: req.query.workspaceId }).populate('assignedTo createdBy', 'name email');
        res.status(200).json(tasks);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error fetching tasks: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.post('/tasks', authMiddleware_1.protect, async (req, res) => {
    try {
        const task = await CollaborationTask_1.default.create({ ...req.body, createdBy: req.researcher._id });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/tasks/:id', authMiddleware_1.protect, async (req, res) => {
    try {
        const task = await CollaborationTask_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Comments
router.get('/comments', authMiddleware_1.protect, async (req, res) => {
    try {
        const comments = await Comment_1.default.find({ targetId: req.query.targetId }).populate('createdBy', 'name email');
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/comments', authMiddleware_1.protect, async (req, res) => {
    try {
        const comment = await Comment_1.default.create({ ...req.body, createdBy: req.researcher._id });
        res.status(201).json(comment);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
