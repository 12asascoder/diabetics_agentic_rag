import { logger } from '../config/logger';
import { retrieveEvidence, RetrievedEvidence } from './researchRetrievalAgent';
import { analyzeEvidence } from './evidenceAnalysisAgent';
import { draftReport } from './researchReportAgent';

export interface OrchestrationState {
  query: string;
  workspaceId: string;
  retrievedEvidence: RetrievedEvidence[];
  analysisResults: any;
  finalReport: string;
  currentStep: 'planning' | 'retrieval' | 'analysis' | 'drafting' | 'completed' | 'error';
  errors: string[];
}

/**
 * Multi-Agent Orchestrator
 * Coordinates the flow of information between specialized agents (State Machine equivalent).
 */
export const runResearchOrchestration = async (query: string, workspaceId: string): Promise<OrchestrationState> => {
  const state: OrchestrationState = {
    query,
    workspaceId,
    retrievedEvidence: [],
    analysisResults: null,
    finalReport: '',
    currentStep: 'planning',
    errors: []
  };

  try {
    logger.info(`[Orchestrator] Starting research pipeline for query: "${query}"`);

    // Step 1: Retrieval
    state.currentStep = 'retrieval';
    // We now query ChromaDB vector store based on workspace ID
    state.retrievedEvidence = await retrieveEvidence(query, workspaceId);
    
    // Step 2: Quality Assessment / Analysis
    state.currentStep = 'analysis';
    state.analysisResults = await analyzeEvidence(query, state.retrievedEvidence);
    
    // Step 3: Drafting
    state.currentStep = 'drafting';
    state.finalReport = await draftReport(query, state.analysisResults);

    state.currentStep = 'completed';
    logger.info(`[Orchestrator] Pipeline completed successfully.`);
    return state;

  } catch (error: any) {
    logger.error(`[Orchestrator] Pipeline failed: ${error.message}`);
    state.currentStep = 'error';
    state.errors.push(error.message);
    return state;
  }
};
