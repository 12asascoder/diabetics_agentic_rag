"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchVectorStore = exports.addDocumentsToVectorStore = exports.getOrCreateCollection = void 0;
const chromadb_1 = require("chromadb");
const logger_1 = require("../config/logger");
const chromaClient = new chromadb_1.ChromaClient({ path: "http://localhost:8000" });
const getOrCreateCollection = async (workspaceId) => {
    try {
        // Generate a safe collection name from workspace ID
        const collectionName = `workspace_${workspaceId.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const collection = await chromaClient.getOrCreateCollection({
            name: collectionName,
            metadata: { "description": `Vector store for workspace ${workspaceId}` }
        });
        return collection;
    }
    catch (error) {
        logger_1.logger.error(`[ChromaDB] Error getting/creating collection for workspace ${workspaceId}: ${error.message}`);
        throw error;
    }
};
exports.getOrCreateCollection = getOrCreateCollection;
const addDocumentsToVectorStore = async (workspaceId, chunks) => {
    try {
        const collection = await (0, exports.getOrCreateCollection)(workspaceId);
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
        logger_1.logger.info(`[ChromaDB] Added ${chunks.length} chunks to workspace ${workspaceId}`);
    }
    catch (error) {
        logger_1.logger.error(`[ChromaDB] Error adding documents: ${error.message}`);
        throw error;
    }
};
exports.addDocumentsToVectorStore = addDocumentsToVectorStore;
const searchVectorStore = async (workspaceId, query, nResults = 5) => {
    try {
        const collection = await (0, exports.getOrCreateCollection)(workspaceId);
        const results = await collection.query({
            queryTexts: [query],
            nResults
        });
        return results;
    }
    catch (error) {
        logger_1.logger.error(`[ChromaDB] Error querying vector store: ${error.message}`);
        return null;
    }
};
exports.searchVectorStore = searchVectorStore;
