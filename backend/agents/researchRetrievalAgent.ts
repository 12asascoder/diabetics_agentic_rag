import { determineRetrievalStrategy } from './routerAgent';
import { queryKatzilla, KatzillaResult } from '../services/katzillaService';
import { DocumentNode } from './documentUnderstandingAgent';

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
export const retrieveEvidence = async (query: string, documentNodes: DocumentNode[]): Promise<RetrievedEvidence[]> => {
  console.log(`[Retrieval Agent] Initiating retrieval for query: "${query}"`);
  
  const strategy = determineRetrievalStrategy(query);
  console.log(`[Retrieval Agent] Selected Strategy: ${strategy}`);

  let results: RetrievedEvidence[] = [];

  if (strategy === 'local' || strategy === 'hybrid') {
    const localResults = retrieveLocal(query, documentNodes);
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

  console.log(`[Retrieval Agent] Retrieval complete. Found ${results.length} relevant pieces of evidence.`);
  return results;
};

const retrieveLocal = (query: string, documentNodes: DocumentNode[]): RetrievedEvidence[] => {
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  
  return documentNodes.map(node => {
    const contentLower = node.content.toLowerCase();
    
    // Keyword relevance heuristic
    let keywordMatches = 0;
    queryWords.forEach(word => {
      if (contentLower.includes(word)) keywordMatches++;
    });
    
    // Normalize score between 0 and 1
    const keywordScore = queryWords.length ? keywordMatches / queryWords.length : 0;
    
    // In a real system, we would query ChromaDB for true semantic similarity.
    // For now, we mix keyword score with a simulated semantic baseline.
    const simulatedSemanticScore = 0.5 + (Math.random() * 0.2); 
    
    const finalScore = (keywordScore * 0.6) + (simulatedSemanticScore * 0.4);

    return {
      source: 'Local Document',
      content: node.content,
      score: finalScore,
      citation: `Document: ${node.metadata?.source || 'Unknown'} (Chunk: ${node.chunk_id})`,
      metadata: node.metadata
    };
  }).filter(r => r.score > 0.4); // Threshold filtering
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
