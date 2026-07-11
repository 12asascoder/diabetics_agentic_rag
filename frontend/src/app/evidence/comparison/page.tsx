"use client";

import React from 'react';
import { 
  Settings2,
  CheckCircle2,
  Heart,
  TrendingDown,
  ArrowRight
} from 'lucide-react';

export default function TreatmentComparison() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex flex-col font-sans pb-8">
      
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-2 text-xs font-label text-secondary tracking-widest uppercase mb-4">
              <span>EVIDENCE EXPLORER</span>
              <span>&gt;</span>
              <span className="text-primary font-bold">TREATMENT COMPARISON</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-2">Metformin vs. Empagliflozin</h1>
            <p className="text-secondary text-sm">Comparative efficacy and safety profiles in Type 2 Diabetes Management.</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-secondary px-4 py-2 rounded font-medium text-sm hover:bg-gray-50 transition-colors shadow-sm">
            <Settings2 size={16} />
            Filter Cohorts
          </button>
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* Metformin Card */}
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl flex flex-col overflow-hidden">
          
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#004225] text-white rounded flex items-center justify-center font-heading font-bold text-2xl">
                  M
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
                    Metformin
                  </h2>
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-label font-bold px-2 py-0.5 rounded tracking-wider mt-1 inline-block">
                    BIGUANIDE
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-label tracking-widest text-secondary uppercase">FIRST-LINE THERAPY</span>
                <div className="bg-tertiary text-white rounded-full p-0.5">
                  <CheckCircle2 size={16} className="fill-tertiary text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-6 bg-white">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded p-4">
                <p className="text-xs font-label tracking-widest text-secondary uppercase mb-2">HbA1c REDUCTION</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-heading font-bold text-primary">-1.5%</span>
                  <span className="text-sm text-secondary">avg</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded p-4">
                <p className="text-xs font-label tracking-widest text-secondary uppercase mb-2">WEIGHT IMPACT</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-heading font-bold text-primary">Neutral</span>
                  <ArrowRight size={16} className="text-secondary" />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded p-4">
              <p className="text-xs font-label tracking-widest text-secondary uppercase mb-2">CV RISK BENEFIT</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-primary">Potential Benefit (UKPDS)</span>
                <CheckCircle2 size={16} className="text-tertiary" />
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 mt-8">
              <p className="text-xs font-label text-secondary mb-6 flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                Relative Risk (Adverse Events)
              </p>
              
              <div className="border-l border-gray-200 pl-4 py-2 relative h-32 bg-gray-50/50">
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-200"></div>
                
                <div className="flex items-center h-full">
                  <div className="w-1/3 text-xs text-secondary pr-4 font-label">GI Distress</div>
                  <div className="flex-1 relative h-6 flex items-center">
                    <div className="absolute left-[30%] right-[30%] h-1 bg-gray-200 rounded-full"></div>
                    <div className="absolute left-[45%] w-3 h-3 bg-[#004225] rounded-full z-10 border border-white"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Empagliflozin Card */}
        <div className="bg-[#F8FAFC] border border-gray-200 rounded-xl flex flex-col overflow-hidden">
          
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary text-white rounded flex items-center justify-center font-heading font-bold text-2xl">
                  E
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
                    Empagliflozin
                  </h2>
                  <span className="bg-gray-100 text-gray-600 text-[10px] font-label font-bold px-2 py-0.5 rounded tracking-wider mt-1 inline-block">
                    SGLT2 INHIBITOR
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-label tracking-widest text-secondary uppercase">CARDIO-PROTECTIVE</span>
                <Heart size={16} className="fill-tertiary text-tertiary mt-1" />
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-6 bg-white">
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded p-4">
                <p className="text-xs font-label tracking-widest text-secondary uppercase mb-2">HbA1c REDUCTION</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-heading font-bold text-primary">-0.8%</span>
                  <span className="text-sm text-secondary">avg</span>
                </div>
              </div>
              <div className="border border-gray-200 rounded p-4">
                <p className="text-xs font-label tracking-widest text-secondary uppercase mb-2">WEIGHT IMPACT</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-heading font-bold text-primary">-2.5kg</span>
                  <TrendingDown size={16} className="text-tertiary" />
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded p-4">
              <p className="text-xs font-label tracking-widest text-secondary uppercase mb-2">CV RISK BENEFIT</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-primary">Proven MACE Reduction (EMPA-REG OUTCOME)</span>
                <div className="bg-tertiary text-white rounded-full p-0.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="flex-1 mt-8">
              <p className="text-xs font-label text-secondary mb-6 flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                Relative Risk (Adverse Events)
              </p>
              
              <div className="border-l border-gray-200 pl-4 py-2 relative h-32 bg-gray-50/50 flex flex-col justify-center gap-6">
                <div className="absolute top-0 bottom-0 left-[60%] w-px bg-gray-200"></div>
                
                <div className="flex items-center w-full">
                  <div className="w-1/3 text-xs text-secondary pr-4 font-label leading-tight">Genital<br/>Infections</div>
                  <div className="flex-1 relative h-6 flex items-center pr-8">
                    <div className="absolute left-[20%] right-[10%] h-1 bg-gray-200 rounded-full"></div>
                    <div className="absolute left-[70%] w-3 h-3 bg-red-600 rounded-full z-10 border border-white"></div>
                  </div>
                </div>

                <div className="flex items-center w-full">
                  <div className="w-1/3 text-xs text-secondary pr-4 font-label leading-tight">Volume<br/>Depletion</div>
                  <div className="flex-1 relative h-6 flex items-center pr-8">
                    <div className="absolute left-[20%] right-[10%] h-1 bg-gray-200 rounded-full"></div>
                    <div className="absolute left-[55%] w-3 h-3 bg-red-600 rounded-full z-10 border border-white"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
