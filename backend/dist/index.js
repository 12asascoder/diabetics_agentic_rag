"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = __importDefault(require("./database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const uploadRoutes_1 = __importDefault(require("./routes/uploadRoutes"));
const agentRoutes_1 = __importDefault(require("./routes/agentRoutes"));
const workspaceRoutes_1 = __importDefault(require("./routes/workspaceRoutes"));
const trialRoutes_1 = __importDefault(require("./routes/trialRoutes"));
const protocolRoutes_1 = __importDefault(require("./routes/protocolRoutes"));
const registryRoutes_1 = __importDefault(require("./routes/registryRoutes"));
const collaborationRoutes_1 = __importDefault(require("./routes/collaborationRoutes"));
const healthRoutes_1 = __importDefault(require("./routes/healthRoutes"));
const env_1 = require("./config/env");
// Validate environment variables on startup
(0, env_1.validateEnv)();
const app = (0, express_1.default)();
const PORT = env_1.env.PORT;
// Connect to database
(0, database_1.default)();
let frontendUrl = env_1.env.FRONTEND_URL;
if (frontendUrl.endsWith('/')) {
    frontendUrl = frontendUrl.slice(0, -1);
}
// Middleware
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // Dynamically allow the request origin (fixes Vercel CORS instantly)
        callback(null, origin || true);
    },
    credentials: true
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// Security Headers Middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Content-Security-Policy', "default-src 'self'");
    next();
});
const errorHandler_1 = require("./middleware/errorHandler");
const logger_1 = require("./config/logger");
// Catch Uncaught Exceptions immediately
process.on('uncaughtException', (err) => {
    logger_1.logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    logger_1.logger.error(err.name, err.message, err.stack);
    process.exit(1);
});
// Routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/upload', uploadRoutes_1.default);
app.use('/api/agents', agentRoutes_1.default);
app.use('/api/workspaces', workspaceRoutes_1.default);
app.use('/api/trials', trialRoutes_1.default);
app.use('/api/protocols', protocolRoutes_1.default);
app.use('/api/registry', registryRoutes_1.default);
app.use('/api/collaboration', collaborationRoutes_1.default);
app.use('/health', healthRoutes_1.default);
app.get('/', (req, res) => {
    res.send('API is running...');
});
// Error Handling Middleware
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
const server = app.listen(PORT, () => {
    logger_1.logger.info(`🚀 Server successfully started and running on port ${PORT}`);
    logger_1.logger.info(`✅ Environment: ${env_1.env.NODE_ENV}`);
    logger_1.logger.info(`✅ CORS Configured for frontend URL: ${frontendUrl}`);
    logger_1.logger.info(`--- Registered API Routes ---`);
    logger_1.logger.info(`  ➔ /api/auth`);
    logger_1.logger.info(`  ➔ /api/upload`);
    logger_1.logger.info(`  ➔ /api/agents`);
    logger_1.logger.info(`  ➔ /api/workspaces`);
    logger_1.logger.info(`  ➔ /api/trials`);
    logger_1.logger.info(`  ➔ /api/protocols`);
    logger_1.logger.info(`  ➔ /api/registry`);
    logger_1.logger.info(`  ➔ /api/collaboration`);
    logger_1.logger.info(`  ➔ /health`);
    logger_1.logger.info(`-----------------------------`);
});
// Catch Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
    logger_1.logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    logger_1.logger.error(err.name, err.message, err.stack);
    server.close(() => {
        process.exit(1);
    });
});
