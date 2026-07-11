"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../utils/authMiddleware");
const Trial_1 = __importDefault(require("../models/Trial"));
const logger_1 = require("../config/logger");
const env_1 = require("../config/env");
const sdk_1 = require("@katzilla/sdk");
const router = express_1.default.Router();
const kz = new sdk_1.Katzilla({ apiKey: env_1.env.KATZILLA_API_KEY });
router.get('/', authMiddleware_1.protect, async (req, res) => {
    try {
        // Try to fetch live clinical trials from Katzilla
        let liveTrials = [];
        try {
            const response = await kz.agent('health').action('nih-clinical-trials', {
                condition: 'diabetes',
                limit: 50
            });
            if (response && response.data && response.data.studies) {
                liveTrials = response.data.studies;
            }
        }
        catch (kzError) {
            logger_1.logger.warn(`[Katzilla] Failed to fetch live trials: ${kzError.message}. Falling back to local DB.`);
        }
        // Also fetch local DB trials
        const localTrials = await Trial_1.default.find(req.query);
        // Combine them, format Katzilla data to match our UI expectations if needed
        const combined = [...localTrials, ...liveTrials.map((t, i) => ({
                _id: `kz_${i}`,
                trialId: t.id || `NCT-KZ-${i}`,
                title: t.title || 'Unknown Title',
                status: t.status || 'Active',
                sponsor: t.lead_sponsor || 'Unknown Sponsor',
                phase: t.phases ? t.phases.join(', ') : 'Phase 2',
                startDate: t.start_date || new Date(),
                studyPopulation: t.enrollment || 0,
                source: 'Katzilla'
            }))];
        res.status(200).json(combined);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error fetching trials: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.post('/', authMiddleware_1.protect, async (req, res) => {
    try {
        const trial = await Trial_1.default.create(req.body);
        res.status(201).json(trial);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error creating trial: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.put('/:id', authMiddleware_1.protect, async (req, res) => {
    try {
        const trial = await Trial_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(trial);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error updating trial: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', authMiddleware_1.protect, async (req, res) => {
    try {
        await Trial_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Trial deleted successfully' });
    }
    catch (error) {
        logger_1.logger.error(`[API] Error deleting trial: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
