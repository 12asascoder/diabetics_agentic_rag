"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../utils/authMiddleware");
const Protocol_1 = __importDefault(require("../models/Protocol"));
const logger_1 = require("../config/logger");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, async (req, res) => {
    try {
        const protocols = await Protocol_1.default.find({ workspaceId: req.query.workspaceId });
        res.status(200).json(protocols);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error fetching protocols: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.post('/', authMiddleware_1.protect, async (req, res) => {
    try {
        const protocol = await Protocol_1.default.create({ ...req.body, createdBy: req.researcher._id });
        res.status(201).json(protocol);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error creating protocol: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.put('/:id', authMiddleware_1.protect, async (req, res) => {
    try {
        const protocol = await Protocol_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(protocol);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error updating protocol: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', authMiddleware_1.protect, async (req, res) => {
    try {
        await Protocol_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Protocol deleted successfully' });
    }
    catch (error) {
        logger_1.logger.error(`[API] Error deleting protocol: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
