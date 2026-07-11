"use client";

import React from 'react';
import { 
  History,
  FlaskConical,
  Download,
  Bookmark,
  Paperclip,
  Database,
  SendHorizontal,
  Plus
} from 'lucide-react';

export default function ResearchAnalysis() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex gap-6 font-sans pb-8">
      
      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-1">Research Analysis</h1>
            <p className="text-secondary text-sm">Querying Document Library & Clinical Trials</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-gray-200 text-gray-700 font-label font-bold text-[10px] uppercase px-2 py-1 rounded">
              Model: GPT-4 Medical
            </span>
            <button className="text-secondary hover:text-primary transition-colors">
              <History size={18} />
            </button>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex-1 overflow-y-auto pr-4 pb-32">
          
          {/* User Message */}
          <div className="mb-10 pl-14 relative">
            <div className="absolute left-0 top-0 w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
              {/* Simulated avatar image */}
              <div className="w-full h-full bg-[url('https://i.pravatar.cc/150?img=47')] bg-cover"></div>
            </div>
            <div className="mb-2">
              <span className="font-heading font-bold text-primary text-sm">Lead Researcher</span>
            </div>
            <div className="border border-gray-200 rounded-lg p-5 bg-white text-primary leading-relaxed shadow-sm">
              What is the consensus on GLP-1 RAs for renal outcomes in type 2 diabetes patients with established CKD, based on recent trials?
            </div>
          </div>

          {/* Agent Message */}
          <div className="mb-10 pl-14 relative">
            <div className="absolute left-0 top-0 w-10 h-10 rounded bg-primary flex items-center justify-center text-white">
              <FlaskConical size={20} />
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="font-heading font-bold text-primary text-sm font-label tracking-wide">DiaResearch IQ Agent</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 bg-[#ecfdf5] text-tertiary border border-[#a7f3d0] font-label font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  94% Clinical Confidence
                </span>
                <button className="text-gray-400 hover:text-primary"><Download size={16} /></button>
                <button className="text-gray-400 hover:text-primary"><Bookmark size={16} /></button>
              </div>
            </div>

            <div className="text-primary leading-relaxed space-y-6">
              <p>
                Based on the analysis of recent major cardiovascular and renal outcome trials (CVOTs), there is a strong consensus that Glucagon-like peptide-1 receptor agonists (GLP-1 RAs) confer significant renoprotective benefits in patients with type 2 diabetes (T2D) and established chronic kidney disease (CKD).
              </p>

              {/* Synthesized Findings Box */}
              <div className="border border-blue-100 bg-blue-50/30 rounded-lg p-6">
                <h4 className="flex items-center gap-2 font-heading font-bold text-primary mb-4">
                  <FlaskConical size={18} className="text-blue-600" />
                  Key Findings Synthesized
                </h4>
                <ul className="space-y-4 list-disc pl-5 text-sm marker:text-gray-400">
                  <li className="pl-1">
                    <strong className="font-semibold text-primary">Macroalbuminuria Reduction:</strong> Consistent reduction in new-onset macroalbuminuria across multiple agents (Dulaglutide, Semaglutide, Liraglutide) [1, 2].
                  </li>
                  <li className="pl-1">
                    <strong className="font-semibold text-primary">eGFR Decline:</strong> Slower rate of estimated glomerular filtration rate (eGFR) decline, particularly notable in the FLOW trial (Semaglutide) which was explicitly designed with primary renal endpoints [3].
                  </li>
                  <li className="pl-1">
                    <strong className="font-semibold text-primary">Composite Renal Outcomes:</strong> Significant reduction in composite endpoints (eGFR decline ≥50%, onset of ESKD, or renal death) compared to placebo [4].
                  </li>
                </ul>
              </div>

              <p>
                Unlike SGLT2 inhibitors, which exert primary hemodynamic effects on the glomerulus, the renoprotective mechanisms of GLP-1 RAs are thought to be primarily mediated through anti-inflammatory and anti-fibrotic pathways...
              </p>
            </div>
          </div>
          
        </div>

        {/* Fixed Input Area */}
        <div className="absolute bottom-0 left-0 right-0 bg-neutral pt-4">
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
            <textarea 
              placeholder="Ask a follow-up question..." 
              className="w-full min-h-[80px] p-4 text-sm focus:outline-none resize-none text-primary placeholder-gray-400"
            ></textarea>
            <div className="bg-gray-50 border-t border-gray-100 px-4 py-3 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors">
                  <Paperclip size={14} /> Attach
                </button>
                <button className="flex items-center gap-1.5 text-xs font-medium text-secondary hover:text-primary transition-colors">
                  <Database size={14} /> Dataset
                </button>
              </div>
              <button className="bg-primary text-white p-2 rounded hover:bg-primary/90 transition-colors">
                <SendHorizontal size={16} />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] font-label text-gray-400 mt-3 mb-1">AI-generated responses should be verified against primary sources.</p>
        </div>

      </div>

      {/* Right Sidebar: Active Citations */}
      <div className="w-80 flex flex-col shrink-0 h-full border-l border-gray-200 pl-6 bg-neutral">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-heading font-bold text-primary flex items-center gap-2">
            <Database size={18} /> Active Citations
          </h3>
          <span className="bg-gray-200 text-gray-700 font-label font-bold text-[10px] px-2 py-0.5 rounded">
            4 Sources
          </span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-4">
          
          {/* Citation 1 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-3 mb-2">
              <span className="bg-gray-100 text-secondary font-label font-bold text-xs px-1.5 py-0.5 rounded border border-gray-200 shrink-0">
                [1]
              </span>
              <h4 className="font-bold text-primary text-sm leading-snug">Effect of Semaglutide on Kidney Outcomes in Patients with Type 2 Diabetes and CKD (FLOW)</h4>
            </div>
            <p className="text-xs font-label text-secondary mb-3 ml-8">N Engl J Med. 2024; 390:1234-1245.</p>
            <div className="flex gap-2 ml-8">
              <span className="bg-gray-100 text-gray-600 font-label font-bold text-[10px] px-1.5 py-0.5 rounded border border-gray-200">RCT</span>
              <span className="bg-[#ecfdf5] text-tertiary border border-[#a7f3d0] font-label font-bold text-[10px] px-1.5 py-0.5 rounded">High Relevance</span>
            </div>
          </div>

          {/* Citation 2 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-3 mb-2">
              <span className="bg-gray-100 text-secondary font-label font-bold text-xs px-1.5 py-0.5 rounded border border-gray-200 shrink-0">
                [2]
              </span>
              <h4 className="font-bold text-primary text-sm leading-snug">Dulaglutide and cardiovascular outcomes in type 2 diabetes (REWIND): a double-blind, randomised placebo-controlled trial</h4>
            </div>
            <p className="text-xs font-label text-secondary mb-3 ml-8">Lancet. 2019; 394:121-130.</p>
            <div className="flex gap-2 ml-8">
              <span className="bg-gray-100 text-gray-600 font-label font-bold text-[10px] px-1.5 py-0.5 rounded border border-gray-200">RCT</span>
              <span className="bg-gray-100 text-gray-600 font-label font-bold text-[10px] px-1.5 py-0.5 rounded border border-gray-200">CVOT</span>
            </div>
          </div>

          {/* Citation 3 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-3 mb-2">
              <span className="bg-gray-100 text-secondary font-label font-bold text-xs px-1.5 py-0.5 rounded border border-gray-200 shrink-0">
                [3]
              </span>
              <h4 className="font-bold text-primary text-sm leading-snug">Semaglutide and Cardiovascular Outcomes in Patients with Type 2 Diabetes (SUSTAIN-6)</h4>
            </div>
            <p className="text-xs font-label text-secondary mb-3 ml-8">N Engl J Med. 2016; 375:1834-1844.</p>
            <div className="flex gap-2 ml-8">
              <span className="bg-gray-100 text-gray-600 font-label font-bold text-[10px] px-1.5 py-0.5 rounded border border-gray-200">RCT</span>
            </div>
          </div>

          {/* Citation 4 */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:border-gray-300 transition-colors">
            <div className="flex items-start gap-3 mb-2">
              <span className="bg-gray-100 text-secondary font-label font-bold text-xs px-1.5 py-0.5 rounded border border-gray-200 shrink-0">
                [4]
              </span>
              <h4 className="font-bold text-primary text-sm leading-snug">Mechanisms of Renoprotection by GLP-1 Receptor Agonists</h4>
            </div>
            <p className="text-xs font-label text-secondary mb-3 ml-8">Kidney Int. 2022; 101(4):673-685.</p>
            <div className="flex gap-2 ml-8">
              <span className="bg-gray-200 text-gray-700 font-label font-bold text-[10px] px-1.5 py-0.5 rounded">Review Article</span>
            </div>
          </div>

        </div>

        <div className="pt-4 border-t border-gray-200">
          <button className="w-full bg-white border border-gray-200 text-secondary py-2.5 rounded text-sm font-medium hover:bg-gray-50 hover:text-primary transition-colors flex items-center justify-center gap-2">
            <Plus size={16} /> Add Custom Source
          </button>
        </div>

      </div>

    </div>
  );
}
