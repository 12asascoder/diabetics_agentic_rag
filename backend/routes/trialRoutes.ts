import express from 'express';
import { protect } from '../utils/authMiddleware';
import Trial from '../models/Trial';
import { logger } from '../config/logger';

import { env } from '../config/env';
import { Katzilla } from '@katzilla/sdk';

const router = express.Router();

const kz = new Katzilla({ apiKey: env.KATZILLA_API_KEY });

router.get('/', protect, async (req, res) => {
  try {
    // Try to fetch live clinical trials from Katzilla
    let liveTrials: any[] = [];
    try {
      const response = await kz.agent('health').action('nih-clinical-trials', {
        condition: 'diabetes',
        limit: 50
      });
      if (response && response.data && response.data.studies) {
        liveTrials = response.data.studies;
      }
    } catch (kzError: any) {
      logger.warn(`[Katzilla] Failed to fetch live trials: ${kzError.message}. Falling back to local DB.`);
    }

    // Also fetch local DB trials
    const localTrials = await Trial.find(req.query);
    
    // Combine them, format Katzilla data to match our UI expectations if needed
    const combined = [...localTrials, ...liveTrials.map((t: any, i: number) => ({
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
  } catch (error: any) {
    logger.error(`[API] Error fetching trials: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const trial = await Trial.create(req.body);
    res.status(201).json(trial);
  } catch (error: any) {
    logger.error(`[API] Error creating trial: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const trial = await Trial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(trial);
  } catch (error: any) {
    logger.error(`[API] Error updating trial: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Trial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Trial deleted successfully' });
  } catch (error: any) {
    logger.error(`[API] Error deleting trial: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

export default router;
