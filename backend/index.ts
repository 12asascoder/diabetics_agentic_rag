import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database';
import authRoutes from './routes/authRoutes';
import uploadRoutes from './routes/uploadRoutes';
import agentRoutes from './routes/agentRoutes';
import workspaceRoutes from './routes/workspaceRoutes';
import { env, validateEnv } from './config/env';

// Validate environment variables on startup
validateEnv();

const app = express();
const PORT = env.PORT;

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: env.FRONTEND_URL,
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

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/workspaces', workspaceRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
