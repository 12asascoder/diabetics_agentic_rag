"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.documentWorker = exports.documentQueue = exports.connection = void 0;
const bullmq_1 = require("bullmq");
const env_1 = require("./env");
const logger_1 = require("./logger");
const documentUnderstandingAgent_1 = require("../agents/documentUnderstandingAgent");
const knowledgeGraphAgent_1 = require("../agents/knowledgeGraphAgent");
const chroma_1 = require("../database/chroma");
const fs_1 = __importDefault(require("fs"));
const ioredis_1 = __importDefault(require("ioredis"));
exports.connection = new ioredis_1.default({
    host: env_1.env.REDIS_HOST || '127.0.0.1',
    port: env_1.env.REDIS_PORT ? parseInt(env_1.env.REDIS_PORT) : 6379,
    ...(env_1.env.REDIS_PASSWORD && { password: env_1.env.REDIS_PASSWORD }),
    maxRetriesPerRequest: null,
});
exports.connection.on('error', (err) => {
    if (err.code === 'ECONNREFUSED') {
        logger_1.logger.error('🚨 Redis connection refused. Document processing queue is offline. Ensure Redis is running on port 6379.');
    }
    else {
        logger_1.logger.error(`🚨 Redis error: ${err.message}`);
    }
});
exports.documentQueue = new bullmq_1.Queue('document-processing', { connection: exports.connection });
// Define the worker that will process document chunks
exports.documentWorker = new bullmq_1.Worker('document-processing', async (job) => {
    logger_1.logger.info(`[Worker] Processing job ${job.id}: ${job.name}`);
    const { documentId, filename, filePath } = job.data;
    try {
        logger_1.logger.debug(`[Worker] Reading file ${filePath}...`);
        const textContent = await fs_1.default.promises.readFile(filePath, 'utf-8');
        logger_1.logger.debug(`[Worker] Running hierarchical chunking for ${filename}...`);
        const { metadata, chunks } = await (0, documentUnderstandingAgent_1.processDocumentHierarchical)(textContent, filename);
        await job.updateProgress(50);
        const workspaceId = job.data.workspaceId || 'global';
        logger_1.logger.debug(`[Worker] Running Knowledge Graph extraction...`);
        const vectorChunks = [];
        for (const chunk of chunks) {
            if (chunk.level === 'paragraph' || chunk.level === 'sentence') {
                await (0, knowledgeGraphAgent_1.extractKnowledgeGraph)(chunk.content, chunk.chunk_id);
                // Prepare for ChromaDB
                vectorChunks.push({
                    id: chunk.chunk_id,
                    text: chunk.content,
                    metadata: { ...chunk.metadata, level: chunk.level }
                });
            }
        }
        logger_1.logger.debug(`[Worker] Adding chunks to Vector Store (Workspace: ${workspaceId})...`);
        await (0, chroma_1.addDocumentsToVectorStore)(workspaceId, vectorChunks);
        // Update progress
        await job.updateProgress(100);
        logger_1.logger.info(`[Worker] Successfully processed job ${job.id}. Extracted ${chunks.length} chunks.`);
    }
    catch (error) {
        logger_1.logger.error(`[Worker] Error processing job ${job.id}: ${error.message}`);
        throw error;
    }
}, { connection: exports.connection });
exports.documentWorker.on('completed', (job) => {
    logger_1.logger.info(`[Worker] Job ${job.id} has completed!`);
});
exports.documentWorker.on('failed', (job, err) => {
    logger_1.logger.error(`[Worker] Job ${job?.id} has failed with ${err.message}`);
});
