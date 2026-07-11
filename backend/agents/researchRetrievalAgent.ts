import { determineRetrievalStrategy } from './routerAgent';
import { queryKatzilla, KatzillaResult } from '../services/katzillaService';
import { DocumentChunk } from './documentUnderstandingAgent';
import { searchVectorStore } from '../database/chroma';
import { logger } from '../config/logger';

export interface RetrievedEvidence {
  source: string;
  content: string;
  score: number;
  citation: string;
  metadata?: any;
}

/**
 * Improved retrieval logic combining semantic similarity (mocked via simple overlap for now),
 * keyword relevance, recency, and metadata filtering.
 */
export const retrieveEvidence = async (query: string, workspaceId: string): Promise<RetrievedEvidence[]> => {
  logger.info(`[Retrieval Agent] Initiating retrieval for query: "${query}" in workspace ${workspaceId}`);
  
  const strategy = determineRetrievalStrategy(query);
  logger.info(`[Retrieval Agent] Selected Strategy: ${strategy}`);

  let results: RetrievedEvidence[] = [];

  if (strategy === 'local' || strategy === 'hybrid') {
    const localResults = await retrieveLocal(query, workspaceId);
    results = results.concat(localResults);
  }

  if (strategy === 'katzilla' || strategy === 'hybrid') {
    const katzillaResponse = await queryKatzilla(query);
    const katzillaMapped = katzillaResponse.results.map((r: KatzillaResult) => ({
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

  logger.info(`[Retrieval Agent] Retrieval complete. Found ${results.length} pieces of evidence.`);
  return results;
};

const retrieveLocal = async (query: string, workspaceId: string): Promise<RetrievedEvidence[]> => {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  
  const chromaResults = await searchVectorStore(workspaceId, query, 10);
  if (!chromaResults || !chromaResults.documents[0]) {
    return [];
  }

  const results: RetrievedEvidence[] = [];
  
  const documents = chromaResults.documents[0];
  const metadatas = chromaResults.metadatas[0];
  const ids = chromaResults.ids[0];
  const distances = chromaResults.distances ? chromaResults.distances[0] : [];
  
  for (let i = 0; i < documents.length; i++) {
    const content = documents[i] as string;
    const metadata = metadatas[i] as any;
    const distance = distances[i] || 1;
    
    // Convert distance to a similarity score (assuming L2 or Cosine distance)
    const semanticScore = Math.max(0, 1 - distance);
    
    // Keyword relevance heuristic
    let keywordMatches = 0;
    const contentLower = content.toLowerCase();
    queryWords.forEach(word => {
      if (contentLower.includes(word)) keywordMatches++;
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

const deduplicateResults = (results: RetrievedEvidence[]): RetrievedEvidence[] => {
  const seenContent = new Set<string>();
  const unique: RetrievedEvidence[] = [];
  
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
