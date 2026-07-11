"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveEvidence = void 0;
const routerAgent_1 = require("./routerAgent");
const katzillaService_1 = require("../services/katzillaService");
const chroma_1 = require("../database/chroma");
const logger_1 = require("../config/logger");
/**
 * Improved retrieval logic combining semantic similarity (mocked via simple overlap for now),
 * keyword relevance, recency, and metadata filtering.
 */
const retrieveEvidence = async (query, workspaceId) => {
    logger_1.logger.info(`[Retrieval Agent] Initiating retrieval for query: "${query}" in workspace ${workspaceId}`);
    const strategy = (0, routerAgent_1.determineRetrievalStrategy)(query);
    logger_1.logger.info(`[Retrieval Agent] Selected Strategy: ${strategy}`);
    let results = [];
    if (strategy === 'local' || strategy === 'hybrid') {
        const localResults = await retrieveLocal(query, workspaceId);
        results = results.concat(localResults);
    }
    if (strategy === 'katzilla' || strategy === 'hybrid') {
        const katzillaResponse = await (0, katzillaService_1.queryKatzilla)(query);
        const katzillaMapped = katzillaResponse.results.map((r) => ({
            source: 'Katzilla API',
            content: r.content,
            score: r.recencyScore * 0.9 + 0.1, // Boost score based on recency
            citation: r.citation,
            metadata: { sourceHash: r.sourceHash }
        }));
        results = results.concat(katzillaMapped);
    }
    // Deduplicate and Sort
    results = deduplicateResults(results);
    results.sort((a, b) => b.score - a.score);
    logger_1.logger.info(`[Retrieval Agent] Retrieval complete. Found ${results.length} pieces of evidence.`);
    return results;
};
exports.retrieveEvidence = retrieveEvidence;
const retrieveLocal = async (query, workspaceId) => {
    const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const chromaResults = await (0, chroma_1.searchVectorStore)(workspaceId, query, 10);
    if (!chromaResults || !chromaResults.documents[0]) {
        return [];
    }
    const results = [];
    const documents = chromaResults.documents[0];
    const metadatas = chromaResults.metadatas[0];
    const ids = chromaResults.ids[0];
    const distances = chromaResults.distances ? chromaResults.distances[0] : [];
    for (let i = 0; i < documents.length; i++) {
        const content = documents[i];
        const metadata = metadatas[i];
        const distance = distances[i] || 1;
        // Convert distance to a similarity score (assuming L2 or Cosine distance)
        const semanticScore = Math.max(0, 1 - distance);
        // Keyword relevance heuristic
        let keywordMatches = 0;
        const contentLower = content.toLowerCase();
        queryWords.forEach(word => {
            if (contentLower.includes(word))
                keywordMatches++;
        });
        const keywordScore = queryWords.length ? keywordMatches / queryWords.length : 0;
        // Hybrid scoring
        const finalScore = (keywordScore * 0.4) + (semanticScore * 0.6);
        if (finalScore > 0.3) {
            results.push({
                source: 'Local Document',
                content,
                score: finalScore,
                citation: `Document: ${metadata?.source || 'Unknown'} (Chunk ID: ${ids[i]})`,
                metadata
            });
        }
    }
    return results;
};
const deduplicateResults = (results) => {
    const seenContent = new Set();
    const unique = [];
    for (const r of results) {
        // Normalize content for basic duplication check
        const normalized = r.content.replace(/\s+/g, '').toLowerCase();
        if (!seenContent.has(normalized)) {
            seenContent.add(normalized);
            unique.push(r);
        }
    }
    return unique;
};
