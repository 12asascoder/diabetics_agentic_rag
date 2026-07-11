"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeEvidence = exports.EvidenceLevel = void 0;
const logger_1 = require("../config/logger");
var EvidenceLevel;
(function (EvidenceLevel) {
    EvidenceLevel["SystematicReview"] = "Systematic Review / Meta-Analysis";
    EvidenceLevel["RCT"] = "Randomised Controlled Trial";
    EvidenceLevel["Cohort"] = "Cohort Study";
    EvidenceLevel["CaseControl"] = "Case Control Study";
    EvidenceLevel["CrossSectional"] = "Cross Sectional Study";
    EvidenceLevel["CaseReport"] = "Case Report";
    EvidenceLevel["AnimalStudy"] = "Animal Study";
    EvidenceLevel["ExpertOpinion"] = "Expert Opinion";
    EvidenceLevel["Unknown"] = "Unknown";
})(EvidenceLevel || (exports.EvidenceLevel = EvidenceLevel = {}));
/**
 * Evidence Analysis & Quality Assessment Agent
 * Evaluates the quality of retrieved evidence, classifies study types, and detects contradictions.
 */
const analyzeEvidence = async (query, evidence) => {
    logger_1.logger.info(`[Analysis Agent] Evaluating ${evidence.length} pieces of evidence.`);
    const analyzedEvidence = evidence.map((e) => {
        // Simulated Evidence Classification
        const contentLower = e.content.toLowerCase();
        let level = EvidenceLevel.Unknown;
        let studyType = 'Observational';
        if (contentLower.includes('randomized') || contentLower.includes('rct')) {
            level = EvidenceLevel.RCT;
            studyType = 'Interventional';
        }
        else if (contentLower.includes('meta-analysis') || contentLower.includes('systematic review')) {
            level = EvidenceLevel.SystematicReview;
            studyType = 'Review';
        }
        else if (contentLower.includes('guidelines') || contentLower.includes('fda')) {
            level = EvidenceLevel.ExpertOpinion;
            studyType = 'Guideline';
        }
        return {
            ...e,
            evidenceLevel: level,
            studyType,
            contradictsPrevious: false, // Simulated
            limitations: ['Small sample size potential', 'Self-reported metrics']
        };
    });
    // Simulated Contradiction Detection
    const contradictions = [];
    if (analyzedEvidence.length > 1) {
        // Example heuristic logic
        if (analyzedEvidence[0].content.includes('increases') && analyzedEvidence[1].content.includes('decreases')) {
            contradictions.push({
                claimA: analyzedEvidence[0].content,
                claimB: analyzedEvidence[1].content,
                reason: 'Conflicting directional outcomes reported.'
            });
            analyzedEvidence[0].contradictsPrevious = true;
            analyzedEvidence[1].contradictsPrevious = true;
        }
    }
    // Simulated Research Gap Discovery
    const researchGaps = [
        'Lack of long-term longitudinal data over 10 years.',
        'Underrepresented demographics in the retrieved clinical trials.'
    ];
    return {
        analyzedEvidence,
        identifiedContradictions: contradictions,
        researchGaps
    };
};
exports.analyzeEvidence = analyzeEvidence;
