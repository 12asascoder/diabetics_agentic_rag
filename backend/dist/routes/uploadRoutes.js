"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '../../uploads/')); // Ensure outside of web root
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = crypto_1.default.randomUUID();
        cb(null, `${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    }
});
const upload = (0, multer_1.default)({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/csv'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only PDF, DOCX, TXT, CSV are allowed.'));
        }
    }
});
const queue_1 = require("../config/queue");
const logger_1 = require("../config/logger");
router.post('/', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }
        // Enqueue document processing job
        const job = await queue_1.documentQueue.add('process-document', {
            filename: req.file.originalname,
            filePath: req.file.path,
            mimetype: req.file.mimetype,
            workspaceId: req.body.workspaceId || null
        });
        logger_1.logger.info(`[Upload Route] Enqueued job ${job.id} for ${req.file.originalname}`);
        res.status(200).json({
            message: 'File uploaded and queued for processing successfully',
            file: req.file.filename,
            jobId: job.id
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = router;
