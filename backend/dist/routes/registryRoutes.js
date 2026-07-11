"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../utils/authMiddleware");
const RegistryItem_1 = __importDefault(require("../models/RegistryItem"));
const logger_1 = require("../config/logger");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const router = express_1.default.Router();
router.get('/', authMiddleware_1.protect, async (req, res) => {
    try {
        const items = await RegistryItem_1.default.find(req.query);
        res.status(200).json(items);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error fetching registry items: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.post('/seed', authMiddleware_1.protect, async (req, res) => {
    try {
        const csvPath = path_1.default.resolve(__dirname, '../../diabetes.csv');
        if (!fs_1.default.existsSync(csvPath)) {
            return res.status(404).json({ message: 'diabetes.csv not found in root directory' });
        }
        const results = [];
        fs_1.default.createReadStream(csvPath)
            .pipe((0, csv_parser_1.default)())
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
                await RegistryItem_1.default.insertMany(itemsToCreate);
                res.status(201).json({ message: `Successfully seeded ${itemsToCreate.length} records from CSV` });
            }
            catch (dbError) {
                logger_1.logger.error(`[API] DB Error during CSV seed: ${dbError.message}`);
                res.status(500).json({ message: dbError.message });
            }
        });
    }
    catch (error) {
        logger_1.logger.error(`[API] Error seeding registry: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.post('/upload', authMiddleware_1.protect, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const results = [];
        const stream = require('stream');
        const bufferStream = new stream.PassThrough();
        bufferStream.end(req.file.buffer);
        bufferStream
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => results.push(data))
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
                await RegistryItem_1.default.insertMany(itemsToCreate);
                res.status(201).json({ message: `Successfully imported ${itemsToCreate.length} records from CSV` });
            }
            catch (dbError) {
                logger_1.logger.error(`[API] DB Error during CSV import: ${dbError.message}`);
                res.status(500).json({ message: dbError.message });
            }
        });
    }
    catch (error) {
        logger_1.logger.error(`[API] Error importing CSV: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.post('/', authMiddleware_1.protect, async (req, res) => {
    try {
        const item = await RegistryItem_1.default.create({ ...req.body, createdBy: req.researcher._id });
        res.status(201).json(item);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error creating registry item: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.put('/:id', authMiddleware_1.protect, async (req, res) => {
    try {
        const item = await RegistryItem_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(item);
    }
    catch (error) {
        logger_1.logger.error(`[API] Error updating registry item: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
router.delete('/:id', authMiddleware_1.protect, async (req, res) => {
    try {
        await RegistryItem_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Registry item deleted successfully' });
    }
    catch (error) {
        logger_1.logger.error(`[API] Error deleting registry item: ${error.message}`);
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
