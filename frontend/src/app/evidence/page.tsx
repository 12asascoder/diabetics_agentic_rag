"use client";

import React from 'react';
import { 
  Network, 
  CheckCircle2, 
  XCircle,
  BookmarkPlus,
  ChevronDown,
  Activity,
  Pill,
  Scale
} from 'lucide-react';

export default function EvidenceExplorer() {
  return (
    <div className="w-full h-full max-w-7xl mx-auto flex gap-6 font-sans pb-8">
      
      {/* Main Content (Graph & Assessment) */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        
        {/* Graph Area */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col flex-1 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
              <Network size={20} /> Hypothesis Topography
            </h2>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-label text-secondary">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span> Outcome Linked
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-label text-secondary">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span> Drug Entity
              </div>
            </div>
          </div>

          <div className="flex-1 border border-gray-200 rounded-lg relative overflow-hidden bg-white" 
            style={{
              backgroundImage: 'linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}>
            
            {/* SVG Graph Mock matching Image 3 precisely */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 800 400">
               {/* Edges */}
               <path d="M 300 250 C 350 150, 450 150, 500 220" fill="none" stroke="#60A5FA" strokeWidth="2" strokeDasharray="5 5" />
               <path d="M 500 220 L 700 150" fill="none" stroke="#94A3B8" strokeWidth="2" />
               <path d="M 500 220 L 650 300" fill="none" stroke="#CBD5E1" strokeWidth="2" />
               <path d="M 250 320 L 300 250" fill="none" stroke="#64748B" strokeWidth="2" />

               {/* Ozempic Node */}
               <rect x="270" y="220" width="60" height="60" rx="8" fill="#10B981" />
               <g transform="translate(288, 238)">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m9.172 14.828 5.656-5.656"/></svg>
               </g>
               <rect x="260" y="290" width="80" height="24" rx="4" fill="white" stroke="#E2E8F0" />
               <text x="300" y="306" fontSize="11" fontFamily="Jetbrains Mono, monospace" fill="#64748B" textAnchor="middle" fontWeight="bold">Ozempic</text>

               {/* Metformin Node */}
               <rect x="470" y="190" width="60" height="60" rx="8" fill="#002B5B" />
               <g transform="translate(488, 208)">
                 <Pill color="white" size={24} />
               </g>
               <rect x="460" y="260" width="80" height="24" rx="4" fill="white" stroke="#E2E8F0" />
               <text x="500" y="276" fontSize="11" fontFamily="Jetbrains Mono, monospace" fill="#64748B" textAnchor="middle" fontWeight="bold">Metformin</text>

               {/* HbA1c Node */}
               <rect x="680" y="130" width="40" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
               <g transform="translate(688, 138)"><Activity color="#64748B" size={24}/></g>
               <text x="700" y="190" fontSize="11" fontFamily="Jetbrains Mono, monospace" fill="#94A3B8" textAnchor="middle">HbA1c</text>
               <text x="700" y="205" fontSize="11" fontFamily="Jetbrains Mono, monospace" fill="#94A3B8" textAnchor="middle">Reduction</text>

               {/* Weight Loss Node */}
               <rect x="630" y="280" width="40" height="40" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
               <g transform="translate(638, 288)"><Scale color="#64748B" size={24}/></g>
               <text x="650" y="340" fontSize="11" fontFamily="Jetbrains Mono, monospace" fill="#94A3B8" textAnchor="middle">Weight Loss</text>

               {/* Zoom controls */}
               <rect x="730" y="300" width="40" height="80" rx="8" fill="white" stroke="#E2E8F0" />
               <path d="M 740 340 L 760 340" stroke="#64748B" strokeWidth="2" />
               <path d="M 750 310 L 750 330 M 740 320 L 760 320" stroke="#64748B" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Hypothesis Assessment Area */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col">
          <p className="text-xs font-label tracking-widest text-secondary uppercase mb-2">Hypothesis Assessment</p>
          <h3 className="text-xl font-heading font-bold text-primary mb-6">Metformin vs GLP-1 RA in early stage CV risk</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Supporting Evidence Col */}
            <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 p-4 flex items-center gap-2">
                <CheckCircle2 className="text-tertiary" size={18} />
                <span className="font-bold text-primary">Supporting Evidence</span>
              </div>
              <div className="p-4 space-y-4 bg-white">
                
                {/* Card 1 */}
                <div className="border border-gray-200 rounded p-4 hover:border-gray-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-[#004225] text-white text-[10px] font-bold px-2 py-1 rounded uppercase">RCT • N=4,528</span>
                    <BookmarkPlus size={16} className="text-gray-400" />
                  </div>
                  <h4 className="font-heading font-bold text-primary text-sm mb-1 line-clamp-2">SUSTAIN-6 Trial outcomes on cardiovascular safety...</h4>
                  <p className="text-xs text-secondary mb-4">Marso et al., NEJM 2016</p>
                  <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-3">
                    <span className="text-gray-500 font-label">99 2,104 citations</span>
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Low Bias</span>
                  </div>
                </div>

                {/* Card 2 Partial Mock */}
                <div className="border border-gray-200 rounded p-4 opacity-50">
                  <span className="bg-[#004225] text-white text-[10px] font-bold px-2 py-1 rounded uppercase mb-3 inline-block">Meta-Analysis</span>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                </div>

              </div>
            </div>

            {/* Conflicting Evidence Col */}
            <div className="flex flex-col border border-red-100 rounded-lg overflow-hidden relative">
              <div className="bg-red-50/30 border-b border-red-100 p-4 flex items-center gap-2">
                <XCircle className="text-red-400" size={18} />
                <span className="font-bold text-red-400">Conflicting Evidence</span>
              </div>
              <div className="p-4 space-y-4 bg-white h-full">
                
                {/* Card 1 */}
                <div className="border border-gray-200 rounded p-4 hover:border-gray-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-1 rounded uppercase">Observational</span>
                    <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded">High Bias Risk</span>
                  </div>
                  <h4 className="font-heading font-bold text-primary text-sm mb-1 line-clamp-2">Real-world variance in GLP-1 RA efficacy across BMI subsets...</h4>
                  <p className="text-xs text-secondary mb-4">Chen et al., Diabetes Care 2021</p>
                  <div className="flex justify-between items-center text-xs border-t border-gray-100 pt-3">
                    <span className="text-gray-500 font-label">99 42 citations</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Right Sidebar: Parameters */}
      <div className="w-72 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col shrink-0 h-fit">
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-heading font-bold text-primary text-lg">Parameters</h3>
          <button className="text-xs font-label text-secondary hover:text-primary transition-colors">Reset</button>
        </div>

        {/* Evidence Tier */}
        <div className="mb-8">
          <h4 className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Evidence Tier</h4>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-primary bg-primary flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm font-medium text-primary">Level 1 (High)</span>
              </div>
              <span className="bg-gray-100 text-gray-500 text-[10px] font-label px-1.5 py-0.5 rounded">142</span>
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-primary bg-primary flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span className="text-sm font-medium text-primary">Level 2 (Moderate)</span>
              </div>
              <span className="bg-gray-100 text-gray-500 text-[10px] font-label px-1.5 py-0.5 rounded">308</span>
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded border border-gray-300 bg-white"></div>
                <span className="text-sm font-medium text-secondary">Level 3 (Low)</span>
              </div>
              <span className="bg-gray-100 text-gray-500 text-[10px] font-label px-1.5 py-0.5 rounded">891</span>
            </label>
          </div>
        </div>

        {/* Study Design */}
        <div className="mb-8">
          <h4 className="text-xs font-label tracking-widest text-secondary uppercase mb-4">Study Design</h4>
          <div className="space-y-2">
            <div className="w-full flex items-center justify-between bg-blue-50 border border-blue-200 text-primary p-3 rounded-md cursor-pointer">
              <span className="text-sm font-medium">RCTs</span>
              <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4 8L11 1" stroke="#002B5B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div className="w-full flex items-center justify-between bg-white border border-gray-200 text-secondary p-3 rounded-md cursor-pointer hover:border-gray-300">
              <span className="text-sm">Observational</span>
            </div>
            <div className="w-full flex items-center justify-between bg-white border border-gray-200 text-secondary p-3 rounded-md cursor-pointer hover:border-gray-300">
              <span className="text-sm">Meta-Analyses</span>
            </div>
            <div className="w-full flex items-center justify-between bg-white border border-gray-200 text-secondary p-3 rounded-md cursor-pointer hover:border-gray-300">
              <span className="text-sm">Case Reports</span>
            </div>
          </div>
        </div>

        {/* Publication Date */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
             <h4 className="text-xs font-label tracking-widest text-secondary uppercase">Publication Date</h4>
             <span className="text-[10px] font-label text-gray-400">2010 - 2024</span>
          </div>
          <div className="relative pt-4 pb-2">
            <div className="h-1 bg-gray-200 rounded-full w-full"></div>
            <div className="absolute top-4 left-[20%] right-0 h-1 bg-primary rounded-full"></div>
            <div className="absolute top-2.5 left-[20%] w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm cursor-grab"></div>
            <div className="absolute top-2.5 right-0 w-4 h-4 bg-white border-2 border-primary rounded-full shadow-sm cursor-grab"></div>
          </div>
        </div>

        {/* Apply Filters */}
        <button className="w-full bg-primary text-white py-3 rounded text-sm font-medium hover:bg-primary/90 transition-colors mt-auto">
          Apply Filters
        </button>
      </div>

    </div>
  );
}
