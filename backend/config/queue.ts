import { Queue, Worker, Job } from 'bullmq';
import { env } from './env';
import { logger } from './logger';
import { processDocumentHierarchical } from '../agents/documentUnderstandingAgent';
import { extractKnowledgeGraph } from '../agents/knowledgeGraphAgent';
import fs from 'fs';

export const connection = {
  host: env.REDIS_HOST || '127.0.0.1',
  port: env.REDIS_PORT ? parseInt(env.REDIS_PORT) : 6379,
};

export const documentQueue = new Queue('document-processing', { connection });

// Define the worker that will process document chunks
export const documentWorker = new Worker('document-processing', async (job: Job) => {
  logger.info(`[Worker] Processing job ${job.id}: ${job.name}`);
  const { documentId, filename, filePath } = job.data;
  
  try {
    logger.debug(`[Worker] Reading file ${filePath}...`);
    const textContent = await fs.promises.readFile(filePath, 'utf-8');
    
    logger.debug(`[Worker] Running hierarchical chunking for ${filename}...`);
    const { metadata, chunks } = await processDocumentHierarchical(textContent, filename);
    await job.updateProgress(50);
    
    logger.debug(`[Worker] Running Knowledge Graph extraction...`);
    for (const chunk of chunks) {
      if (chunk.level === 'paragraph' || chunk.level === 'sentence') {
        await extractKnowledgeGraph(chunk.content, chunk.chunk_id);
        // In production, we would save these nodes and edges via Mongoose here
      }
    }
    
    // Update progress
    await job.updateProgress(100);
    logger.info(`[Worker] Successfully processed job ${job.id}. Extracted ${chunks.length} chunks.`);
  } catch (error: any) {
    logger.error(`[Worker] Error processing job ${job.id}: ${error.message}`);
    throw error;
  }
}, { connection });

documentWorker.on('completed', (job) => {
  logger.info(`[Worker] Job ${job.id} has completed!`);
});

documentWorker.on('failed', (job, err) => {
  logger.error(`[Worker] Job ${job?.id} has failed with ${err.message}`);
});
