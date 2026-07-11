import { logger } from '../config/logger';
import { RetrievedEvidence } from './researchRetrievalAgent';

export enum EvidenceLevel {
  SystematicReview = 'Systematic Review / Meta-Analysis',
  RCT = 'Randomised Controlled Trial',
  Cohort = 'Cohort Study',
  CaseControl = 'Case Control Study',
  CrossSectional = 'Cross Sectional Study',
  CaseReport = 'Case Report',
  AnimalStudy = 'Animal Study',
  ExpertOpinion = 'Expert Opinion',
  Unknown = 'Unknown'
}

export interface AnalyzedEvidence extends RetrievedEvidence {
  evidenceLevel: EvidenceLevel;
  studyType: string;
  contradictsPrevious: boolean;
  limitations: string[];
}

export interface AnalysisResult {
  analyzedEvidence: AnalyzedEvidence[];
  identifiedContradictions: { claimA: string, claimB: string, reason: string }[];
  researchGaps: string[];
}

/**
 * Evidence Analysis & Quality Assessment Agent
 * Evaluates the quality of retrieved evidence, classifies study types, and detects contradictions.
 */
export const analyzeEvidence = async (query: string, evidence: RetrievedEvidence[]): Promise<AnalysisResult> => {
  logger.info(`[Analysis Agent] Evaluating ${evidence.length} pieces of evidence.`);
  
  const analyzedEvidence: AnalyzedEvidence[] = evidence.map((e) => {
    // Simulated Evidence Classification
    const contentLower = e.content.toLowerCase();
    let level = EvidenceLevel.Unknown;
    let studyType = 'Observational';
    
    if (contentLower.includes('randomized') || contentLower.includes('rct')) {
      level = EvidenceLevel.RCT;
      studyType = 'Interventional';
    } else if (contentLower.includes('meta-analysis') || contentLower.includes('systematic review')) {
      level = EvidenceLevel.SystematicReview;
      studyType = 'Review';
    } else if (contentLower.includes('guidelines') || contentLower.includes('fda')) {
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
