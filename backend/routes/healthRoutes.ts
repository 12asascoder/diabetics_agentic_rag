import express from 'express';
import mongoose from 'mongoose';
import { env } from '../config/env';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: env.NODE_ENV,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

router.get('/database', (req, res) => {
  const readyState = mongoose.connection.readyState;
  const statusMap: Record<number, string> = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
    99: 'uninitialized',
  };

  const isConnected = readyState === 1;
  const status = statusMap[readyState] || 'unknown';

  if (!isConnected) {
    return res.status(503).json({
      status: 'unhealthy',
      database: status,
    });
  }

  res.status(200).json({
    status: 'healthy',
    database: status,
    host: mongoose.connection.host
  });
});

export default router;
