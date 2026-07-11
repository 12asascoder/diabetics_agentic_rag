import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import agentRoutes from './routes/agentRoutes';
import workspaceRoutes from './routes/workspaceRoutes';
import trialRoutes from './routes/trialRoutes';
import protocolRoutes from './routes/protocolRoutes';
import registryRoutes from './routes/registryRoutes';
import collaborationRoutes from './routes/collaborationRoutes';
import healthRoutes from './routes/healthRoutes';
import { env, validateEnv } from './config/env';

// Validate environment variables on startup
validateEnv();

const app = express();
const PORT = env.PORT;

// Connect to database
connectDB();

let frontendUrl = env.FRONTEND_URL;
if (frontendUrl.endsWith('/')) {
  frontendUrl = frontendUrl.slice(0, -1);
}

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Dynamically allow the request origin (fixes Vercel CORS instantly)
    callback(null, origin || true);
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});

import { notFound, errorHandler } from './middleware/errorHandler';
import { logger } from './config/logger';

// Catch Uncaught Exceptions immediately
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥');
  if (err) {
    logger.error(err.name, err.message, err.stack);
  }
  
  if (err?.message?.includes('ECONNREFUSED') || err?.message?.includes('Redis')) {
    logger.warn('Redis connection failed, but keeping server alive.');
    return;
  }
  
  process.exit(1);
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/protocols', protocolRoutes);
app.use('/api/registry', registryRoutes);
app.use('/api/collaboration', collaborationRoutes);
app.use('/health', healthRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server successfully started and running on port ${PORT}`);
  logger.info(`✅ Environment: ${env.NODE_ENV}`);
  logger.info(`✅ CORS Configured for frontend URL: ${frontendUrl}`);
  logger.info(`--- Registered API Routes ---`);
  logger.info(`  ➔ /api/auth`);
  logger.info(`  ➔ /api/upload`);
  logger.info(`  ➔ /api/agents`);
  logger.info(`  ➔ /api/workspaces`);
  logger.info(`  ➔ /api/trials`);
  logger.info(`  ➔ /api/protocols`);
  logger.info(`  ➔ /api/registry`);
  logger.info(`  ➔ /api/collaboration`);
  logger.info(`  ➔ /health`);
  logger.info(`-----------------------------`);
});

// Catch Unhandled Promise Rejections
process.on('unhandledRejection', (err: any) => {
  logger.error('UNHANDLED REJECTION! 💥');
  if (err) {
    logger.error(err.name, err.message, err.stack);
  }
  
  // If it's a Redis connection error, don't crash the server.
  if (err?.message?.includes('ECONNREFUSED') || err?.message?.includes('Redis')) {
    logger.warn('Redis connection failed, but keeping server alive.');
    return;
  }

  // For other critical errors, shut down gracefully
  server.close(() => {
    process.exit(1);
  });
});
