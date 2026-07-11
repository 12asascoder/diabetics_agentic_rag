"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../config/env");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        environment: env_1.env.NODE_ENV,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});
router.get('/database', (req, res) => {
    const readyState = mongoose_1.default.connection.readyState;
    const statusMap = {
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
        host: mongoose_1.default.connection.host
    });
});
router.get('/environment', (req, res) => {
    const memoryUsage = process.memoryUsage();
    res.status(200).json({
        status: 'healthy',
        environment: env_1.env.NODE_ENV,
        memory: {
            rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`
        }
    });
});
router.get('/routes', (req, res) => {
    // Since we can't easily introspect all mounted routers without traversing the express app object,
    // we return a health status that the router is accessible.
    // Full route logging happens on startup in index.ts
    res.status(200).json({
        status: 'healthy',
        message: 'Routes are mounted and accessible. See startup logs for full route tree.'
    });
});
exports.default = router;
