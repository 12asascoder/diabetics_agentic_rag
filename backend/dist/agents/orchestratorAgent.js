"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runResearchOrchestration = void 0;
const logger_1 = require("../config/logger");
const researchRetrievalAgent_1 = require("./researchRetrievalAgent");
const evidenceAnalysisAgent_1 = require("./evidenceAnalysisAgent");
const researchReportAgent_1 = require("./researchReportAgent");
/**
 * Multi-Agent Orchestrator
 * Coordinates the flow of information between specialized agents (State Machine equivalent).
 */
const runResearchOrchestration = async (query, workspaceId) => {
    const state = {
        query,
        workspaceId,
        retrievedEvidence: [],
        analysisResults: null,
        finalReport: '',
        currentStep: 'planning',
        errors: []
    };
    try {
        logger_1.logger.info(`[Orchestrator] Starting research pipeline for query: "${query}"`);
        // Step 1: Retrieval
        state.currentStep = 'retrieval';
        // We now query ChromaDB vector store based on workspace ID
        state.retrievedEvidence = await (0, researchRetrievalAgent_1.retrieveEvidence)(query, workspaceId);
        // Step 2: Quality Assessment / Analysis
        state.currentStep = 'analysis';
        state.analysisResults = await (0, evidenceAnalysisAgent_1.analyzeEvidence)(query, state.retrievedEvidence);
        // Step 3: Drafting
        state.currentStep = 'drafting';
        state.finalReport = await (0, researchReportAgent_1.draftReport)(query, state.analysisResults);
        state.currentStep = 'completed';
        logger_1.logger.info(`[Orchestrator] Pipeline completed successfully.`);
        return state;
    }
    catch (error) {
        logger_1.logger.error(`[Orchestrator] Pipeline failed: ${error.message}`);
        state.currentStep = 'error';
        state.errors.push(error.message);
        return state;
    }
};
exports.runResearchOrchestration = runResearchOrchestration;
