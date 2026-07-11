"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineRetrievalStrategy = void 0;
const REGULATORY_KEYWORDS = ['guideline', 'fda', 'law', 'regulation', 'policy', 'government', 'compliance', 'standard', 'mandate', 'approval', 'latest'];
/**
 * Intelligent Router Agent
 * Analyzes the query to determine the optimal retrieval strategy.
 * Prevents unnecessary external API calls.
 */
const determineRetrievalStrategy = (query) => {
    console.log(`[Router Agent] Analyzing query strategy: "${query}"`);
    const lowerQuery = query.toLowerCase();
    // If query explicitly asks for both or compares local vs external
    if (lowerQuery.includes('compare') || (lowerQuery.includes('local') && lowerQuery.includes('regulatory'))) {
        return 'hybrid';
    }
    // Check if query contains regulatory or authoritative keywords
    const requiresRegulatoryData = REGULATORY_KEYWORDS.some(keyword => lowerQuery.includes(keyword));
    if (requiresRegulatoryData) {
        // We assume if it requires regulatory data, Katzilla is the primary source.
        // We still might want hybrid if they reference 'my documents' or 'the uploaded'
        if (lowerQuery.includes('uploaded') || lowerQuery.includes('document')) {
            return 'hybrid';
        }
        return 'katzilla';
    }
    // Default to local RAG to avoid unnecessary API calls
    return 'local';
};
exports.determineRetrievalStrategy = determineRetrievalStrategy;
