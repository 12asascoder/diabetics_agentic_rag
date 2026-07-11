import express from 'express';
import { protect } from '../utils/authMiddleware';
import RegistryItem from '../models/RegistryItem';
import { logger } from '../config/logger';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

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

router.post('/seed', protect, async (req, res) => {
  try {
    const csvPath = path.resolve(__dirname, '../../diabetes.csv');
    if (!fs.existsSync(csvPath)) {
      return res.status(404).json({ message: 'diabetes.csv not found in root directory' });
    }

    const results: any[] = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          const itemsToCreate = results.slice(0, 100).map((row, index) => ({
            itemType: 'Patient',
            name: `Patient Record #${index + 1000}`,
            description: `Diabetes Patient Record (Age: ${row.Age}, Outcome: ${row.Outcome})`,
            tags: ['diabetes', 'csv-import', row.Outcome === '1' ? 'positive' : 'negative'],
            metadata: row,
            workspaceId: req.body.workspaceId,
            createdBy: req.researcher._id
          }));

          await RegistryItem.insertMany(itemsToCreate);
          res.status(201).json({ message: `Successfully seeded ${itemsToCreate.length} records from CSV` });
        } catch (dbError: any) {
          logger.error(`[API] DB Error during CSV seed: ${dbError.message}`);
          res.status(500).json({ message: dbError.message });
        }
      });
  } catch (error: any) {
    logger.error(`[API] Error seeding registry: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
});

router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const results: any[] = [];
    const stream = require('stream');
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    bufferStream
      .pipe(csv())
      .on('data', (data: any) => results.push(data))
      .on('end', async () => {
        try {
          const itemsToCreate = results.slice(0, 100).map((row, index) => ({
            itemType: 'Import',
            name: `Imported Record #${index + 1}`,
            description: `Imported Data Record`,
            tags: ['csv-import'],
            metadata: row,
            workspaceId: req.body.workspaceId || '000000000000000000000000',
            createdBy: req.researcher._id
          }));

          await RegistryItem.insertMany(itemsToCreate);
          res.status(201).json({ message: `Successfully imported ${itemsToCreate.length} records from CSV` });
        } catch (dbError: any) {
          logger.error(`[API] DB Error during CSV import: ${dbError.message}`);
          res.status(500).json({ message: dbError.message });
        }
      });
  } catch (error: any) {
    logger.error(`[API] Error importing CSV: ${error.message}`);
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
