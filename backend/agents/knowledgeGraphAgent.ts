import { logger } from '../config/logger';
import { EntityType } from '../models/KnowledgeGraphNode';
import { EdgeRelationship } from '../models/KnowledgeGraphEdge';

export interface ExtractedEntity {
  name: string;
  type: EntityType;
  confidence: number;
}

export interface ExtractedRelationship {
  source: string;
  target: string;
  relationship: EdgeRelationship;
  evidenceChunkId: string;
  confidence: number;
}

/**
 * Knowledge Graph Generation Pipeline
 * Extracts medical entities and their relationships from document chunks.
 */
export const extractKnowledgeGraph = async (text: string, chunkId: string): Promise<{ entities: ExtractedEntity[], relationships: ExtractedRelationship[] }> => {
  logger.info(`[Knowledge Graph Agent] Extracting entities from chunk: ${chunkId}`);
  
  // Simulated Medical Entity Extraction (In production, this routes to @google/genai or similar)
  const entities: ExtractedEntity[] = [];
  const relationships: ExtractedRelationship[] = [];
  const lowerText = text.toLowerCase();
  
  // Heuristic extraction for demonstration purposes
  if (lowerText.includes('glp-1') || lowerText.includes('metformin')) {
    entities.push({ name: lowerText.includes('glp-1') ? 'GLP-1' : 'Metformin', type: EntityType.Drug, confidence: 0.95 });
  }
  
  if (lowerText.includes('diabetes') || lowerText.includes('hba1c')) {
    entities.push({ name: 'Type 2 Diabetes', type: EntityType.Disease, confidence: 0.9 });
    
    if (entities.some(e => e.type === EntityType.Drug)) {
      const drug = entities.find(e => e.type === EntityType.Drug)!.name;
      relationships.push({
        source: drug,
        target: 'Type 2 Diabetes',
        relationship: EdgeRelationship.Treats,
        evidenceChunkId: chunkId,
        confidence: 0.85
      });
    }
  }

  return { entities, relationships };
};
