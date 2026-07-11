import { Queue, Worker, Job } from 'bullmq';
import { env } from './env';
import { logger } from './logger';
import { processDocumentHierarchical } from '../agents/documentUnderstandingAgent';
import { extractKnowledgeGraph } from '../agents/knowledgeGraphAgent';
import { addDocumentsToVectorStore } from '../database/chroma';
import fs from 'fs';

export const connection = {
  host: env.REDIS_HOST || '127.0.0.1',
  port: env.REDIS_PORT ? parseInt(env.REDIS_PORT) : 6379,
  ...(env.REDIS_PASSWORD && { password: env.REDIS_PASSWORD })
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
    
    const workspaceId = job.data.workspaceId || 'global';
    
    logger.debug(`[Worker] Running Knowledge Graph extraction...`);
    const vectorChunks = [];
    for (const chunk of chunks) {
      if (chunk.level === 'paragraph' || chunk.level === 'sentence') {
        await extractKnowledgeGraph(chunk.content, chunk.chunk_id);
        // Prepare for ChromaDB
        vectorChunks.push({
          id: chunk.chunk_id,
          text: chunk.content,
          metadata: { ...chunk.metadata, level: chunk.level }
        });
      }
    }
    
    logger.debug(`[Worker] Adding chunks to Vector Store (Workspace: ${workspaceId})...`);
    await addDocumentsToVectorStore(workspaceId, vectorChunks);
    
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
