import express from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/')); // Ensure outside of web root
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomUUID();
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'text/csv'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, TXT, CSV are allowed.'));
    }
  }
});

import { documentQueue } from '../config/queue';
import { logger } from '../config/logger';

router.post('/', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }

    // Enqueue document processing job
    const job = await documentQueue.add('process-document', {
      filename: req.file.originalname,
      filePath: req.file.path,
      mimetype: req.file.mimetype,
      workspaceId: req.body.workspaceId || null
    });

    logger.info(`[Upload Route] Enqueued job ${job.id} for ${req.file.originalname}`);

    res.status(200).json({ 
      message: 'File uploaded and queued for processing successfully', 
      file: req.file.filename,
      jobId: job.id
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
