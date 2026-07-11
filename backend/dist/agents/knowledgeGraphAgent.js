"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractKnowledgeGraph = void 0;
const logger_1 = require("../config/logger");
const KnowledgeGraphNode_1 = require("../models/KnowledgeGraphNode");
const KnowledgeGraphEdge_1 = require("../models/KnowledgeGraphEdge");
/**
 * Knowledge Graph Generation Pipeline
 * Extracts medical entities and their relationships from document chunks.
 */
const extractKnowledgeGraph = async (text, chunkId) => {
    logger_1.logger.info(`[Knowledge Graph Agent] Extracting entities from chunk: ${chunkId}`);
    // Simulated Medical Entity Extraction (In production, this routes to @google/genai or similar)
    const entities = [];
    const relationships = [];
    const lowerText = text.toLowerCase();
    // Heuristic extraction for demonstration purposes
    if (lowerText.includes('glp-1') || lowerText.includes('metformin')) {
        entities.push({ name: lowerText.includes('glp-1') ? 'GLP-1' : 'Metformin', type: KnowledgeGraphNode_1.EntityType.Drug, confidence: 0.95 });
    }
    if (lowerText.includes('diabetes') || lowerText.includes('hba1c')) {
        entities.push({ name: 'Type 2 Diabetes', type: KnowledgeGraphNode_1.EntityType.Disease, confidence: 0.9 });
        if (entities.some(e => e.type === KnowledgeGraphNode_1.EntityType.Drug)) {
            const drug = entities.find(e => e.type === KnowledgeGraphNode_1.EntityType.Drug).name;
            relationships.push({
                source: drug,
                target: 'Type 2 Diabetes',
                relationship: KnowledgeGraphEdge_1.EdgeRelationship.Treats,
                evidenceChunkId: chunkId,
                confidence: 0.85
            });
        }
    }
    return { entities, relationships };
};
exports.extractKnowledgeGraph = extractKnowledgeGraph;
