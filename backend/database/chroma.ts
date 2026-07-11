import { ChromaClient } from 'chromadb';
import { logger } from '../config/logger';

const chromaClient = new ChromaClient({ path: "http://localhost:8000" });

export const getOrCreateCollection = async (workspaceId: string) => {
  try {
    // Generate a safe collection name from workspace ID
    const collectionName = `workspace_${workspaceId.replace(/[^a-zA-Z0-9]/g, '_')}`;
    const collection = await chromaClient.getOrCreateCollection({
      name: collectionName,
      metadata: { "description": `Vector store for workspace ${workspaceId}` }
    });
    return collection;
  } catch (error: any) {
    logger.error(`[ChromaDB] Error getting/creating collection for workspace ${workspaceId}: ${error.message}`);
    throw error;
  }
};

export const addDocumentsToVectorStore = async (workspaceId: string, chunks: { id: string, text: string, metadata: any }[]) => {
  try {
    const collection = await getOrCreateCollection(workspaceId);
    
    // In production, we'd use an embedding model like @google/genai here.
    // Since we are mocking embeddings for now or using Chroma's default embedding function:
    
    const ids = chunks.map(c => c.id);
    const documents = chunks.map(c => c.text);
    const metadatas = chunks.map(c => c.metadata);

    await collection.add({
      ids,
      documents,
      metadatas
    });

    logger.info(`[ChromaDB] Added ${chunks.length} chunks to workspace ${workspaceId}`);
  } catch (error: any) {
    logger.error(`[ChromaDB] Error adding documents: ${error.message}`);
    throw error;
  }
};

export const searchVectorStore = async (workspaceId: string, query: string, nResults: number = 5) => {
  try {
    const collection = await getOrCreateCollection(workspaceId);
    
    const results = await collection.query({
      queryTexts: [query],
      nResults
    });
    
    return results;
  } catch (error: any) {
    logger.error(`[ChromaDB] Error querying vector store: ${error.message}`);
    return null;
  }
};
